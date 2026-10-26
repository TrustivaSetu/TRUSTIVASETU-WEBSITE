// Brute-force protection for /api/admin/login (security audit #13, 2026-10-17).
// In-memory (single pm2 process): per client IP at most IP_MAX attempts per
// window, and per account at most ACCOUNT_MAX failures before a lockout —
// whichever trips first. A restart clears the counters; that is acceptable for
// a small admin panel and avoids a DB migration.
const WINDOW_MS = 15 * 60 * 1000
const IP_MAX = 20
const ACCOUNT_MAX = 5
const LOCK_MS = 15 * 60 * 1000

type Bucket = { count: number; resetAt: number; lockedUntil?: number }
const byIp = new Map<string, Bucket>()
const byAccount = new Map<string, Bucket>()

function prune(map: Map<string, Bucket>, now: number) {
  if (map.size < 5000) return
  for (const [k, b] of map) if (b.resetAt <= now && (b.lockedUntil ?? 0) <= now) map.delete(k)
}

function bump(map: Map<string, Bucket>, key: string, now: number): Bucket {
  prune(map, now)
  let b = map.get(key)
  if (!b || b.resetAt <= now) {
    b = { count: 0, resetAt: now + WINDOW_MS, lockedUntil: b?.lockedUntil }
    map.set(key, b)
  }
  b.count++
  return b
}

// Behind our nginx, X-Real-IP is set from the TCP peer (client-supplied values
// are overwritten), so it is the trustworthy source.
export function adminClientIp(req: Request): string {
  const real = req.headers.get("x-real-ip")?.trim()
  if (real) return real
  const parts = (req.headers.get("x-forwarded-for") ?? "").split(",").map(s => s.trim()).filter(Boolean)
  return parts.length ? parts[parts.length - 1] : "unknown"
}

// Call before checking the password. Returns seconds to wait if blocked.
export function adminLoginBlocked(ip: string, email: string): number | null {
  const now = Date.now()
  const acct = byAccount.get(email)
  if (acct?.lockedUntil && acct.lockedUntil > now) return Math.ceil((acct.lockedUntil - now) / 1000)
  const ipB = bump(byIp, ip, now)
  if (ipB.count > IP_MAX) return Math.ceil((ipB.resetAt - now) / 1000)
  return null
}

export function adminLoginFailed(email: string) {
  const now = Date.now()
  const b = bump(byAccount, email, now)
  if (b.count >= ACCOUNT_MAX) {
    b.lockedUntil = now + LOCK_MS
    b.count = 0
    console.warn(`[admin-login] account locked for ${LOCK_MS / 60000} min after ${ACCOUNT_MAX} failures`)
  }
}

export function adminLoginSucceeded(email: string) {
  byAccount.delete(email)
}
