import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

import { userService } from './services/user.service';

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
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
    signIn: async ({ account, profile }) => {
      if (account?.provider === 'google') {
        const { email, name, picture } = profile as { email: string; name: string; picture: string };

        await userService.findOrCreateUser({
          email: email + '@google.com',
          nickname: name,
          image: picture,
        });
      }

      if (account?.provider === 'naver') {
        const { email, name, image } = profile?.response as { email: string; name: string; image: string };
        await userService.findOrCreateUser({
          email: email + '@naver.com',
          nickname: name,
          image: image,
        });
      }

      if (account?.provider === 'kakao') {
        const { nickname, profile_image } = profile?.properties as { nickname: string; profile_image: string };
        const { email } = profile?.kakao_account as { email: string };
        await userService.findOrCreateUser({
          email: email + '@kakao.com',
          nickname: nickname,
          image: profile_image,
        });
      }

      return true;
    },
    jwt: async ({ token, user, account }) => {
      if (account && user) {
        token.accessToken = account.access_token;
        token.userId = user.id;
      }

      return token;
    },
    session: async ({ session }) => {
      return session;
    },
  },
  pages: {
    error: '/login',
  },
});
