// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getAuthSession } from '@/utils/auth.middleware';

const protectedPaths = ['/mypage', '/'];

export async function middleware(request: NextRequest) {
  const session = await getAuthSession(request);

  const pathname = request.nextUrl.pathname;

  const isProtectedPath = protectedPaths.includes(pathname);

  if (isProtectedPath && !session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('message', '로그인이 필요합니다.');

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
