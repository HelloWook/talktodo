'use client';
import { useDayPicker } from 'react-day-picker';

import Icon from '../../Icon/Icon';

const Navigation = () => {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();
  return (
    <div className='rdp-nav flex items-center justify-between px-2'>
      <button onClick={() => goToMonth(previousMonth!)} className='w-fit cursor-pointer'>
        <Icon name='chevron-left' className='h-6 w-6 fill-white' />
      </button>
      <button onClick={() => goToMonth(nextMonth!)} className='w-fit cursor-pointer'>
        <Icon name='chevron-right' className='h-6 w-6 fill-white' />
      </button>
    </div>
  );
};

export default Navigation;
