import { useEffect, useState } from 'react';

import DatePicker from './DatePicker';

const meta = {
  component: DatePicker,
  title: 'components/DatePicker',
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

export const Single = () => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    console.log('DatePicker mounted with initial date:', date);
  }, [date]);

  return <DatePicker date={date} onDateChange={setDate} closeSelector={() => {}} />;
};
