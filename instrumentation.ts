// Runs once when a Next.js server instance starts, before it serves requests.
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  // Refuse to boot without a real AUTH_SECRET — see lib/auth-secret.ts.
  const { exitIfAuthSecretInvalid } = await import('./lib/auth-secret')
  exitIfAuthSecretInvalid()
}
