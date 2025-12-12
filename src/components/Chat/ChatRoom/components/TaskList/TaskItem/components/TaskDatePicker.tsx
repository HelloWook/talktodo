import DatePicker from '@/components/DatePicker/DatePicker';
import { formatDateDisplay, parseDateString } from '@/utils/dateFormat';

interface TaskDatePickerProps {
  dateString: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onDateChange: (date: Date) => void;
}

const TaskDatePicker = ({ dateString, isOpen, onOpen, onClose, onDateChange }: TaskDatePickerProps) => {
  return (
    <div className='relative flex items-center gap-2'>
      <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M12 2.5H4C3.17157 2.5 2.5 3.17157 2.5 4V12C2.5 12.8284 3.17157 13.5 4 13.5H12C12.8284 13.5 13.5 12.8284 13.5 12V4C13.5 3.17157 12.8284 2.5 12 2.5Z'
          stroke='#8f3fff'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path d='M10.5 1V4M5.5 1V4M2.5 6.5H13.5' stroke='#8f3fff' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
      <button onClick={onOpen} className='cursor-pointer text-xs text-gray-600 transition-colors hover:text-purple-600'>
        {formatDateDisplay(dateString)}
      </button>
      {isOpen && (
        <div className='absolute top-full left-0 z-50 mt-2'>
          <DatePicker date={parseDateString(dateString)} onDateChange={onDateChange} closeSelector={onClose} />
        </div>
      )}
    </div>
  );
};

export default TaskDatePicker;
