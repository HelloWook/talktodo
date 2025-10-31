import { useRouter } from 'next/navigation';
import { useState } from 'react';

import DatePicker from '@/components/DatePicker/DatePicker';
import Icon from '@/components/Icon/Icon';

import { formatDateToPath } from './dateUtils';

export default function DatePickerButton() {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (isOpen && date) {
      router.push(formatDateToPath(date));
    }
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={handleToggle}
        className='flex cursor-pointer items-center justify-center rounded-lg p-2 transition-colors hover:bg-gray-100'
        aria-label='날짜 선택'
        aria-expanded={isOpen}
      >
        <Icon name='calendar' className='h-6 w-6' />
      </button>

      {isOpen && (
        <>
          <div
            className='fixed inset-0 z-40'
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            role='button'
            tabIndex={0}
            aria-label='날짜 선택기 닫기'
          />

          <div className='absolute top-full left-0 z-50 mt-2'>
            <DatePicker setDate={setDate} closeSelector={handleToggle} date={date} />
          </div>
        </>
      )}
    </div>
  );
}
