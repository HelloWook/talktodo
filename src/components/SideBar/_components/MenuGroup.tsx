import Icon from '@/components/Icon/Icon';

import MenuItem from './MenuItem';

interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface MenuGroupProps {
  title: string;
  icon: string;
  items: MenuItem[];
  isFold: boolean;
  onTitleClick?: () => void;
}

export default function MenuGroup({ title, icon, items, isFold, onTitleClick }: MenuGroupProps) {
  return (
    <div className={`flex w-full flex-col justify-center border-b border-gray-200 py-5 ${items.length > 0 ? `gap-3` : ''}`}>
      {/* 메뉴 그룹 헤더 */}
      <button className={`flex cursor-pointer items-center ${isFold ? 'justify-center' : 'gap-1'}`} onClick={onTitleClick}>
        <Icon name={icon} className='h-8 w-8' />

        {!isFold && <span className='font-body1-semibold text-gray-900'>{title}</span>}
      </button>

      {/* 메뉴 아이템들 */}
      <div className='flex h-full flex-col gap-2'>
        {!isFold &&
          items.map((item) => (
            <MenuItem key={item.id} icon={item.icon} label={item.label} isActive={item.isActive} onClick={item.onClick} />
          ))}
      </div>
    </div>
  );
}
