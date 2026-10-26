// AUTH_SECRET signs and verifies the website admin session cookie
// (lib/auth.ts) and is checked again by proxy.ts for /admin/* pages.
//
// There is deliberately NO fallback. This repo is public, so any hard-coded
// default is a known key: a deployment that started without AUTH_SECRET would
// accept admin cookies anyone can forge. Instead the server refuses to start
// (instrumentation.ts -> exitIfAuthSecretInvalid) and lib/auth.ts refuses to load.
export const MIN_AUTH_SECRET_LENGTH = 32

export function authSecretProblem(value = process.env.AUTH_SECRET): string | null {
  if (!value) return 'AUTH_SECRET is not set'
  if (value.length < MIN_AUTH_SECRET_LENGTH) {
    return `AUTH_SECRET is too short (${value.length} chars; need at least ${MIN_AUTH_SECRET_LENGTH})`
  }
  return null
}

export function getAuthSecret(): Uint8Array {
  const problem = authSecretProblem()
  if (problem) {
    throw new Error(
      `${problem} — refusing to sign or verify admin sessions. ` +
        'Set it in .env.production (generate one with: openssl rand -base64 32).',
    )
  }
  return new TextEncoder().encode(process.env.AUTH_SECRET)
}

// Called from instrumentation.ts (Node.js runtime only) at server start.
// Exits rather than throws: Next 16 only logs a throwing register() and keeps
// listening, which pm2 would report as "online" while every request fails.
// Exiting makes pm2 show the app as errored.
export function exitIfAuthSecretInvalid(): void {
  const problem = authSecretProblem()
  if (!problem) return
  console.error(
    `[startup] ${problem}. Admin session cookies would be unverifiable or forgeable — refusing to start. ` +
      'Set AUTH_SECRET in .env.production (generate one with: openssl rand -base64 32).',
  )
  process.exit(1)
}
