import Icon from '@/components/Icon/Icon';
import { useSidebar } from '@/components/SideBar/SideBar';

interface MenuItemProps {
  label: string;
  icon?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const MenuItem = ({ label, icon, isActive = false, onClick }: MenuItemProps) => {
  const { isFold } = useSidebar();

  return (
    <button
      onClick={onClick}
      className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
        isActive ? 'bg-purple-100 font-semibold text-purple-600' : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {icon && <Icon name={icon} className='h-6 w-6' />}
      {!isFold && <span className='text-sm'>{label}</span>}
    </button>
  );
};

export default MenuItem;
