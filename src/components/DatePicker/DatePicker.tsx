'use client';
import { useEffect, useState } from 'react';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import 'react-day-picker/style.css';
import { ko } from 'react-day-picker/locale';

import Button from '@/components/Button/Button';

import Caption from './Caption/Caption';
import Navigation from './Navigation/Navigation';

const defaultClassNames = getDefaultClassNames();
const commonProps = {
  style: {
    '--rdp-accent-color': '#8f3fff',
    '--rdp-background-color': '#F7FAFC',
    '--rdp-text-color': '#2D3748',
    '--rdp-selected-text-color': '#FFFFFF',
    '--rdp-selected-background-color': '#8f3fff',
    '--rdp-day-radius': '9999px',
    '--rdp-day-height': '38px',
    '--rdp-day-width': '38px',
    '--rdp-day_button-height': '38px',
    '--rdp-day_button-width': '38px',
  } as React.CSSProperties,
  classNames: {
    root: `${defaultClassNames.root}  font-body3-medium-tight `,
    day_selected: 'bg-purple-500 text-white rounded-full border border-purple-500',
    caption: 'w-full max-w-[200px] m-auto',
    table: 'w-full table-fixed',
  },
  locale: ko,
  showOutsideDays: true,
  components: {
    CaptionLabel: Caption,
    Nav: Navigation,
  } as const,
};

type SingleDate = Date | undefined;

interface DatePickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
  closeSelector: () => void;
}

const DatePicker = ({ date, onDateChange, closeSelector }: DatePickerProps) => {
  const [datePickerDate, setPickerDate] = useState<SingleDate>(date);

  useEffect(() => {
    setPickerDate(date);
  }, [date]);

  const handleSetDate = () => {
    if (datePickerDate) {
      onDateChange(datePickerDate);
    }
    closeSelector();
  };

  const handleReset = () => {
    const now = new Date();
    setPickerDate(now);
    onDateChange(now);
    closeSelector();
  };

  return (
    <div className='h-fit w-80 rounded-3xl bg-white px-[27.5px] py-6 shadow-[0_0_40px_0_rgba(52,35,101,0.15)]'>
      <DayPicker
        mode='single'
        {...commonProps}
        selected={datePickerDate}
        onSelect={setPickerDate as (date?: Date) => void}
        classNames={{
          ...commonProps.classNames,
          today: 'text-purple-white',
          selected: `bg-purple-500 border-purple-500 text-white rounded-full `,
        }}
        required
      />
      <div className='mt-5 flex w-full items-center gap-3'>
        <Button variant='quaternary' className='w-full text-black' type='button' onClick={handleReset}>
          초기화
        </Button>
        <Button variant='primary' className='w-full' type='button' onClick={handleSetDate}>
          {'적용하기'}
        </Button>
      </div>
    </div>
  );
};

export default DatePicker;
