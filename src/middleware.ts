import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === '/auth' || path === '/auth/signup'

  // Get the token from the cookies
  const token = request.cookies.get('authToken')?.value || ''

  // Redirect to login if accessing a protected route without auth
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  // Redirect to home if accessing auth page with a token
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 