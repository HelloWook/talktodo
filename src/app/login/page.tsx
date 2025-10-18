'use client';
import Image from 'next/image';
import React from 'react';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';

import Typography from '@/components/Typography/Typography';

const page = () => {
  return (
    <div className='gradient-bg flex min-h-screen w-full items-center justify-center p-4'>
      <div className='flex w-full max-w-md flex-col items-center gap-[130px] sm:gap-[150px]'>
        <Image src='/img/logo.png' alt='logo' width={220} height={270} className='h-auto w-full max-w-[220px]' />
        <div className='flex w-full flex-col gap-3 sm:gap-4'>
          <Button variant='naver' size='medium' className='w-full' onClick={() => {}}>
            <Icon name='naver' />
            <Typography variant='body2-medium-tight' className='flex-1 text-center'>
              네이버로 시작하기
            </Typography>
          </Button>
          <Button variant='kakao' size='medium' className='w-full' onClick={() => {}}>
            <Icon name='kakao' />
            <Typography variant='body2-medium-tight' className='flex-1 text-center text-black'>
              카카오로 시작하기
            </Typography>
          </Button>
          <Button variant='google' size='medium' className='w-full' onClick={() => {}}>
            <Icon name='google' />
            <Typography variant='body2-medium-tight' className='flex-1 text-center text-black'>
              구글로 시작하기
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
