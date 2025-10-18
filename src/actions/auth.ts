'use server';

import { signIn } from '@/auth';

export async function signInWithGoogle() {
  await signIn('google', { redirectTo: '/' });
}

export async function signInWithNaver() {
  await signIn('naver');
}

export async function signInWithKakao() {
  await signIn('kakao');
}
