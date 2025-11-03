'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProfileSectionType {
  isFold: boolean;
  userNickname: string;
  userEmail: string;
}

export default function ProfileSection({ isFold, userNickname, userEmail }: ProfileSectionType) {
  const router = useRouter();

  // 마이페이지로 이동하는 라우팅
  const handleProfileClick = () => {
    router.push('/mypage');
  };

  return (
    <div className='w-full'>
      <div className='mb-4 w-full border-b border-gray-200' />
      <button className='flex cursor-pointer items-center gap-3' onClick={handleProfileClick}>
        <Image src='/img/Profile.png' alt='profile' width={32} height={32} />
        {!isFold && (
          <div className='flex flex-1 flex-col items-start self-stretch'>
            <span className='font-body3-semibold text-gray-900'>{userNickname}</span>
            <span className='font-caption-regular pc:font-body3-medium text-gray-600'>{userEmail}</span>
          </div>
        )}
      </button>
    </div>
  );
}
