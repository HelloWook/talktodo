'use client';

import { useRouter } from 'next/navigation';

import Icon from '@/components/Icon/Icon';

interface SidebarHeaderProps {
  isFold: boolean;
  onFoldToggle: () => void;
}

export default function SidebarHeader({ isFold, onFoldToggle }: SidebarHeaderProps) {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <div className={`flex items-center justify-between self-stretch border-b border-gray-200 py-5 ${isFold ? 'justify-center' : ''}`}>
      <button className='flex cursor-pointer items-center justify-center' onClick={handleLogoClick}>
        <Icon name='logo' className='h-8 w-8' />
      </button>
      <button className='relative cursor-pointer' onClick={onFoldToggle}>
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
