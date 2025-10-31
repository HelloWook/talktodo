import Icon from '@/components/Icon/Icon';

import type { NavigationButtonProps } from './DateSelector.types';

export default function NavigationButton({ direction, onClick }: NavigationButtonProps) {
  const iconName = direction === 'prev' ? 'chevron-left' : 'chevron-right';
  const label = direction === 'prev' ? '이전 날짜' : '다음 날짜';

  return (
    <button onClick={onClick} aria-label={label} className='transition-opacity hover:opacity-70'>
      <Icon name={iconName} className='h-6 w-6 fill-white' />
    </button>
  );
}
