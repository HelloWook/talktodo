import { format } from 'date-fns';
import React, { createContext, useCallback, useContext, useMemo } from 'react';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import SelectProirty from '@/components/SelectPriorty/SelectPriorty';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Goal, Priority, RepeatDay, Task } from '@/types/Task';
import { cn } from '@/utils/cn';

import DatePicker from '../DatePicker/DatePicker';
import Input from '../Input/Input';
import Typography from '../Typography/Typography';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';

interface FormState {
  task: Task;
  updateTask: (updater: (prev: Task) => Task) => void;
}

const FormContext = createContext<FormState | null>(null);
const useFormContext = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('Form components must be used within <Form>');
  return ctx;
};

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  task: Task;
  onTaskChange: (task: Task) => void;
}

const Form = ({ children, task, onTaskChange, ...props }: FormProps) => {
  const updateTask = useCallback<FormState['updateTask']>(
    (updater) => {
      const next = updater(task);
      onTaskChange(next);
    },
    [task, onTaskChange],
  );

  const value = useMemo<FormState>(() => ({ task, updateTask }), [task, updateTask]);

  return (
    <FormContext.Provider value={value}>
      <form {...props} className={cn('mx-auto w-full max-w-[480px] rounded-[40px] bg-white p-6 shadow', props.className)}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

// Header
interface HeaderProps {
  title: string;
  onClose: () => void;
}
const Header = ({ title, onClose }: HeaderProps) => {
  return (
    <header className='mb-3 border-b border-gray-200 pb-2'>
      <div className='flex items-center justify-between'>
        <Typography variant='title1-semibold' as='p'>
          {title}
        </Typography>
        <button type='button' className='cursor-pointer' onClick={onClose} aria-label='닫기'>
          <Icon name='close' className='h-8 w-8' />
        </button>
      </div>
    </header>
  );
};

interface TaskFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

const TitleField = ({ label, ...props }: TaskFieldProps) => {
  const { updateTask } = useFormContext();
  const inputId = React.useId();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => updateTask((prev) => ({ ...prev, title: e.target.value }));
  return (
    <>
      <label htmlFor={inputId}>
        <Typography variant='body3-semibold' as='span'>
          {label}
        </Typography>
      </label>
      <Input id={inputId} {...props} onChange={handleChange} />
    </>
  );
};

const DescriptionField = ({ label, ...props }: TaskFieldProps) => {
  const { updateTask } = useFormContext();
  const inputId = React.useId();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => updateTask((prev) => ({ ...prev, description: e.target.value }));
  return (
    <>
      <label htmlFor={inputId}>
        <Typography variant='body3-semibold' as='span'>
          {label}
        </Typography>
      </label>
      <Input id={inputId} {...props} onChange={handleChange} />
    </>
  );
};

interface SelectPriortyFieldProps {
  className?: string;
}

const SelectPriortyField = ({ className }: SelectPriortyFieldProps) => {
  const { updateTask } = useFormContext();
  const triggerId = React.useId();

  return (
    <div className={cn('w-full', className)}>
      <label htmlFor={triggerId}>
        <Typography variant='body3-semibold' as='span'>
          우선순위
        </Typography>
      </label>
      <SelectProirty
        onChange={(p) => updateTask((prev) => ({ ...prev, priority: p as Priority }))}
        className='w-full'
        triggerProps={{ id: triggerId }}
      />
    </div>
  );
};

interface FormActionsProps {
  className?: string;
}

const FormActions = ({ className }: FormActionsProps) => {
  return (
    <Button variant='primary' type='submit' className={cn('w-full', className)}>
      완료하기
    </Button>
  );
};

interface GoalSelectorProps {
  goals: Goal[];
  className?: string;
}
const GoalSelector = ({ goals, className }: GoalSelectorProps) => {
  const { updateTask } = useFormContext();
  const triggerId = React.useId();
  return (
    <div className={cn('w-full', className)}>
      <label htmlFor={triggerId}>
        <Typography variant='body3-semibold' as='span'>
          목표
        </Typography>
      </label>
      <Select
        onValueChange={(goalId) => {
          const goal = goals.find((g) => g.id === goalId);
          updateTask((prev) => ({ ...prev, goal: goal ? { id: goal.id, name: goal.name } : prev.goal }));
        }}
      >
        <SelectTrigger className='mt-2 w-full' id={triggerId}>
          <SelectValue placeholder='목표를 선택하세요.' />
        </SelectTrigger>
        <SelectContent className='border-0'>
          <SelectGroup>
            {goals.map((g) => (
              <SelectItem key={g.id} value={g.id}>
                {g.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const REPEAT_DAYS: RepeatDay[] = ['월', '화', '수', '목', '금', '토', '일'];

const RepeatButtonGroup = ({ className }: { className?: string }) => {
  const { task, updateTask } = useFormContext();
  return (
    <fieldset className={cn('w-full', className)}>
      <legend>
        <Typography variant='body3-semibold' as='span'>
          반복 요일
        </Typography>
      </legend>
      <div className={cn('flex flex-wrap justify-between')}>
        {REPEAT_DAYS.map((day) => {
          const isSelected = task.repeatDays.includes(day);

          return (
            <Button
              key={day}
              onClick={() =>
                updateTask((prev) =>
                  prev.repeatDays.includes(day)
                    ? { ...prev, repeatDays: prev.repeatDays.filter((d) => d !== day) }
                    : { ...prev, repeatDays: [...prev.repeatDays, day] },
                )
              }
              variant='quaternary'
              className={cn(
                '!hover:text-purple-500 !hover:bg-purple-300 h-[39px] active:bg-purple-300 active:text-purple-500',
                isSelected ? '!bg-purple-300 !text-purple-500' : '!bg-gray-100 !text-gray-700',
              )}
              type='button'
            >
              <Typography variant='body2-medium-tight' as='span'>
                {day}
              </Typography>
            </Button>
          );
        })}
      </div>
    </fieldset>
  );
};

const DateField = () => {
  const { task, updateTask } = useFormContext();
  const [open, setOpen] = React.useState(false);
  const triggerId = React.useId();
  return (
    <div className='w-full'>
      <label htmlFor={triggerId}>
        <Typography variant='body3-semibold' as='span'>
          날짜
        </Typography>
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type='button'
            className='w-full rounded-2xl border border-gray-300 bg-white px-3 py-2 text-left'
            onClick={() => setOpen(!open)}
            id={triggerId}
          >
            {task.createdAt ? format(new Date(task.createdAt), 'yyyy-MM-dd') : '날짜 선택'}
          </button>
        </PopoverTrigger>
        <PopoverContent align='start' sideOffset={8} className='w-auto border-none bg-white p-0 shadow-none'>
          <DatePicker
            date={new Date(task.createdAt)}
            setDate={(date) => updateTask((prev) => ({ ...prev, createdAt: date as Date }))}
            closeSelector={() => setOpen(false)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

Form.Header = Header;
Form.TitleField = TitleField;
Form.DescriptionField = DescriptionField;
Form.SelectPriortyField = SelectPriortyField;
Form.GoalSelector = GoalSelector;
Form.RepeatButtonGroup = RepeatButtonGroup;
Form.FormActions = FormActions;
Form.DateField = DateField;

export default Form;
