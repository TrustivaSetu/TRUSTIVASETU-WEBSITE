import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const basicAuthPassword = process.env.BASIC_AUTH_PASSWORD

  // No password configured — public access (production default)
  if (!basicAuthPassword) {
    return NextResponse.next()
  }

  const auth = request.headers.get('authorization')

  if (auth) {
    const encoded = auth.split(' ')[1]
    const decoded = atob(encoded)
    const [user, password] = decoded.split(':')

    if (user === 'admin' && password === basicAuthPassword) {
      return NextResponse.next()
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}

export const config = {
  matcher: [
    /*
     * Protect all routes EXCEPT:
     * - _next/static  (JS/CSS bundles)
     * - _next/image   (image optimisation endpoint — must be open or images 401)
     * - _next/webpack (HMR in development)
     * - favicon.ico
     * - Public static files (images, PDFs, SVGs, fonts)
     */
    '/((?!_next/static|_next/image|_next/webpack|favicon\\.ico|.*\\.(?:jpg|jpeg|gif|png|webp|svg|ico|pdf|woff|woff2|ttf|otf)$).*)',
  ],
}