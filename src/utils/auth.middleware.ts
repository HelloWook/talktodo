import { NextRequest } from 'next/server';

export async function getAuthSession(request: NextRequest) {
  const sessionToken =
    process.env.NODE_ENV === 'production'
      ? request.cookies.get('__Secure-authjs.session-token')?.value
      : request.cookies.get('authjs.session-token')?.value;

  return sessionToken ? { user: { id: 'authenticated' } } : null;
}
