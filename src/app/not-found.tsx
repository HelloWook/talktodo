'use client';

import Image from 'next/image';

import Typography from '@/components/Typography/Typography';

export default function NotFound() {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-purple-50 p-4'>
      <div className='flex w-full max-w-[410px] flex-col items-center gap-6'>
        <Image src='/img/ErrorLogo.png' alt='Error' width={400} height={400} />

        <div className='flex flex-col items-center gap-3'>
          <Typography variant='title3-bold' className='text-gray-900'>
            요청하신 페이지를 찾을 수 없습니다
          </Typography>
          <Typography variant='body3-medium-loose' className='text-center text-gray-500'>
            페이지의 주소가 변경 혹은 삭제되었을 수 있습니다
            <br />
            입력하신 주소를 다시 확인해주세요
          </Typography>
        </div>
      </div>
    </div>
  );
}
