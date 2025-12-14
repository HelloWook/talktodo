'use client';

import { useRouter } from 'next/navigation';

import Icon from '@/components/Icon/Icon';
import { useSidebar } from '@/components/SideBar/SideBar';

export default function SidebarHeader() {
  const router = useRouter();
  const { isFold, toggleFold, isMobile } = useSidebar();

  const handleLogoClick = () => {
    router.push('/');
  };

  // 모바일일 때는 헤더를 숨김 (상단 버튼에서 처리)
  if (isMobile) {
    return null;
  }

  return (
    <div className={`flex items-center justify-between self-stretch border-b border-gray-200 py-5 ${isFold ? 'justify-center' : ''}`}>
      <button className='flex cursor-pointer items-center justify-center' onClick={handleLogoClick}>
        <Icon name='logo' className='h-8 w-8' />
      </button>
      <button className='relative cursor-pointer' onClick={toggleFold}>
        {!isFold && <Icon name='fold' className='h-6 w-6' />}

        {isFold && (
          <div className='absolute top-[-20px] right-[-43px] flex aspect-square h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow'>
            <Icon name='unfold' className='h-6 w-6' />
          </div>
        )}
      </button>
    </div>
  );
}
