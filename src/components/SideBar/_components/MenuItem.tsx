interface MenuItemProps {
  icon?: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function MenuItem({ icon, label, isActive = false, onClick }: MenuItemProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className={`flex h-[43px] w-[230px] cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors duration-200 ${
        isActive ? 'bg-purple-50' : 'hover:bg-purple-50'
      }`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role='button'
      aria-label={label}
    >
      {icon && (
        <div className='flex h-6 w-6 items-center justify-center'>
          <span className='text-lg'>{icon}</span>
        </div>
      )}
      <span className={`font-body2-regular truncate text-left tracking-[-0.32px] ${isActive ? 'text-purple-600' : 'text-gray-500'}`}>
        {label}
      </span>
    </div>
  );
}
