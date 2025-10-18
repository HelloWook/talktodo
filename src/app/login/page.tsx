'use client';
import Image from 'next/image';
import React from 'react';

import LoginForm from '@/components/LoginForm/LoginForm';

const page = () => {
  return (
    <div className='gradient-bg flex min-h-screen w-full items-center justify-center p-4'>
      <div className='flex w-full max-w-md flex-col items-center gap-[130px] sm:gap-[150px]'>
        <Image src='/img/logo.png' alt='logo' width={220} height={270} className='h-auto w-full max-w-[220px]' />
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
