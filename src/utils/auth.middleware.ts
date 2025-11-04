import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function getAuthSession(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  return token ? { user: { id: token.userId } } : null;
}
