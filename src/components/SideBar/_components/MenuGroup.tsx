import { ReactNode } from 'react';

import Icon from '@/components/Icon/Icon';
import { useSidebar } from '@/components/SideBar/SideBar';

interface MenuGroupProps {
  title: string;
  icon: string;
  onTitleClick?: () => void;
  children?: ReactNode;
}

export default function MenuGroup({ title, icon, onTitleClick, children }: MenuGroupProps) {
  const { isFold } = useSidebar();

  return (
    <div className={`flex w-full flex-col justify-center border-b border-gray-200 py-5 ${children && !isFold && `gap-3`}`}>
      {/* 메뉴 그룹 헤더 */}
      <button className={`flex cursor-pointer items-center ${isFold ? 'justify-center' : 'gap-1'}`} onClick={onTitleClick}>
        <Icon name={icon} className='h-8 w-8' />

        {!isFold && <span className='font-body1-semibold text-gray-900'>{title}</span>}
      </button>

      {/* 메뉴 아이템들 */}
      {!isFold && children && <div className='flex h-full flex-col gap-2'>{children}</div>}
    </div>
  );
}
