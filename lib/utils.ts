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