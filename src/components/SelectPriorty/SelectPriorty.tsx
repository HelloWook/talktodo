import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Priority } from '@/types';
import { cn } from '@/utils/cn';

import Dot from '../Dot/Dot';

interface SelectProirtyProps {
  value?: Priority;
  onChange: (priority: Priority) => void;
  className?: string;
  triggerProps?: React.ComponentProps<typeof SelectTrigger>;
}

const SelectProirty = ({ value, onChange, className, triggerProps }: SelectProirtyProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn(className)} {...triggerProps}>
        <SelectValue placeholder='우선 순위를 선택해주세요.' />
      </SelectTrigger>
      <SelectContent className='border-0'>
        <SelectGroup>
          <SelectItem value='중요'>
            <Dot priority='중요' className='h-2 w-2' />
            중요
          </SelectItem>
          <SelectItem value='보통'>
            <Dot priority='보통' className='h-2 w-2' />
            보통
          </SelectItem>
          <SelectItem value='낮음'>
            <Dot priority='낮음' className='h-2 w-2' />
            낮음
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectProirty;
