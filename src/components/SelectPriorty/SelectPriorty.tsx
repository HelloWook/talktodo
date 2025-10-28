type Priority = 'low' | 'medium' | 'high';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/utils/cn';

interface SelectProirtyProps {
  onChange: (priority: Priority) => void;
  className?: string;
}

const SelectProirty = ({ onChange, className }: SelectProirtyProps) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className={cn(className)}>
        <SelectValue placeholder='우선 순위를 선택해주세요.' />
      </SelectTrigger>
      <SelectContent className='border-0'>
        <SelectGroup>
          <SelectItem value='high'>
            <div className='h-2 w-2 rounded-full bg-red-500' />
            중요
          </SelectItem>
          <SelectItem value='medium'>
            <div className='h-2 w-2 rounded-full bg-yellow-500' />
            보통
          </SelectItem>
          <SelectItem value='low'>
            <div className='h-2 w-2 rounded-full bg-green-500' />
            낮음
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectProirty;
