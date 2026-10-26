export function formatDateTime(date: any) {
  return String(date)
}

export function formatDate(date: any) {
  return String(date)
}

export function formatLakhs(value: any) {
  return String(value)
}

export function formatPercent(value: any) {
  return String(value)
}

export function getGrowthColor(value: any) {
  return 'text-white'
}

export function getRoleColor(value: any) {
  return 'text-white'
}

export function getRoleLabel(value: any) {
  return String(value)
}

export function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Returns a blog cover-image URL only when it's a genuinely non-empty http(s)
 * link to an image — not "", not null, and not a social/embed permalink
 * (Instagram etc.) that would render as a broken <img>.
 */
export function validCoverImage(value: string | null | undefined): string | null {
  if (typeof value !== 'string') return null
  const s = value.trim()
  if (!s || !/^https?:\/\//i.test(s)) return null
  if (/(instagram|tiktok|youtube|twitter|facebook)\.com|youtu\.be/i.test(s)) return null
  return s
}