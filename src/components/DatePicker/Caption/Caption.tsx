'use client';
import React from 'react';
import { useDayPicker } from 'react-day-picker';

const Caption = () => {
  const { months } = useDayPicker();

  return (
    <span className='ml-[8px] flex w-[200px] items-center' role='status' aria-live='polite'>
      {months[0].date.getFullYear()}년 {months[0].date.getMonth() + 1} 월
    </span>
  );
};

export default Caption;
