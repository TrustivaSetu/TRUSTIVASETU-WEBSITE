import type { LosDatabase } from './types'

export async function fetchLosDb(): Promise<LosDatabase> {
  const res = await fetch('/api/los/db', { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to load LOS data')
  return res.json()
}

export async function saveLosDb(db: LosDatabase): Promise<void> {
  const res = await fetch('/api/los/db', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(db),
  })
  if (!res.ok) throw new Error('Failed to save LOS data')
}
