import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

  const basicAuth = request.headers.get('authorization')

  if (basicAuth) {

    const authValue = request.headers
      .get('authorization')
      ?.split(' ')[1]

    const [user, pass] = atob(authValue || '').split(':')

    if (user === 'admin' && pass === 'trustiva123') {
      return NextResponse.next()
    }
  }

  return new NextResponse(
    'Authentication required.',
    {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    }
  )
}

export const config = {
  matcher: '/:path*',
}