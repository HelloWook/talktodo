import { useState } from 'react';

import { cn } from '@/utils/cn';

import Icon from '../Icon/Icon';

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuGroup, DropdownMenuContent } from '../ui/dropdown-menu';
type FabSize = 'small' | 'large';

const sizeClasses = {
  small: 'h-[64px] w-[64px]',
  large: 'h-[80px] w-[80px]',
} as const satisfies Record<FabSize, string>;

interface FabProps {
  items: {
    label: string;
    onClick: () => void;
  }[];
  size: FabSize;
  className?: string;
}

const Fab = ({ items, size, className }: FabProps) => {
  const [showItems, setShowItems] = useState(false);

  return (
    <DropdownMenu open={showItems} onOpenChange={setShowItems}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'flex cursor-pointer items-center justify-center rounded-full bg-black duration-200 outline-none',
            sizeClasses[size],
            className,
          )}
          aria-label='Open Menu'
        >
          <Icon name='plus' className={cn('text-white transition-transform duration-200', showItems && 'rotate-[45deg]')} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' side='top' className='border-0'>
        <DropdownMenuGroup>
          {items.map((item) => (
            <DropdownMenuItem key={item.label} className='cursor-pointer p-3' onClick={() => item.onClick()}>
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Fab;
