import React from 'react';

import { signInWithGoogle, signInWithNaver, signInWithKakao } from '@/actions/auth';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';

import Typography from '@/components/Typography/Typography';

const LoginForm = () => {
  return (
    <div className='flex w-full flex-col gap-3 sm:gap-4'>
      <form action={signInWithNaver}>
        <Button variant='naver' size='medium' className='w-full' type='submit'>
          <Icon name='naver' />
          <Typography variant='body2-medium-tight' className='flex-1 text-center'>
            네이버로 시작하기
          </Typography>
        </Button>
      </form>
      <form action={signInWithKakao}>
        <Button variant='kakao' size='medium' className='w-full' type='submit'>
          <Icon name='kakao' />
          <Typography variant='body2-medium-tight' className='flex-1 text-center text-black'>
            카카오로 시작하기
          </Typography>
        </Button>
      </form>
      <form action={signInWithGoogle}>
        <Button variant='google' size='medium' className='w-full' type='submit'>
          <Icon name='google' />
          <Typography variant='body2-medium-tight' className='flex-1 text-center text-black'>
            구글로 시작하기
          </Typography>
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
