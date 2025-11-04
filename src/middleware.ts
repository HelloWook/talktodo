// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { auth } from '@/auth';

const protectedPaths = ['/mypage', '/'];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const pathname = request.nextUrl.pathname;

  const isProtectedPath = protectedPaths.includes(pathname);

  if (isProtectedPath && !session) {
    const loginUrl = new URL('/login', request.url);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
