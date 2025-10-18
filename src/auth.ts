import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
        },
      },
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, //1 days,
  },
  callbacks: {
    signIn: async () => {
      return true;
    },
    jwt: async ({ token, user, account, profile }) => {
      if (account && user) {
        token.accessToken = account.access_token;
        token.userId = user.id;
      }

      return token;
    },
    session: async ({ session, token }) => {
      return session;
    },
  },
  pages: {
    error: '/login',
  },
});
