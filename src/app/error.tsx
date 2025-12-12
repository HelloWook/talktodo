'use client';

import Image from 'next/image';

import Button from '@/components/Button/Button';
import Typography from '@/components/Typography/Typography';
import { ApiError } from '@/error/error';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const errorMessage = error instanceof ApiError ? error.message : error.message || '예상치 못한 오류가 발생했습니다.';

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-purple-50 p-4'>
      <div className='flex w-full max-w-[410px] flex-col items-center gap-6'>
        <Image src='/img/ErrorLogo.png' alt='Error' width={400} height={400} />

        <div className='flex flex-col items-center gap-3'>
          <Typography variant='title3-bold' className='text-gray-900'>
            오류가 발생했습니다
          </Typography>
          <Typography variant='body3-medium-loose' className='text-center text-gray-500'>
            {errorMessage}
            <br />
            문제가 지속되면 페이지를 새로고침해주세요
          </Typography>
        </div>

        <div className='flex gap-3'>
          <Button variant='primary' size='medium' onClick={reset}>
            다시 시도
          </Button>
          <Button
            variant='secondary'
            size='medium'
            onClick={() => {
              window.location.href = '/';
            }}
          >
            홈으로 이동
          </Button>
        </div>
      </div>
    </div>
  );
}
