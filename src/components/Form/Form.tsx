import { format } from 'date-fns';
import React, { createContext, useContext } from 'react';
import { UseFormReturn, Controller } from 'react-hook-form';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import SelectProirty from '@/components/SelectPriorty/SelectPriorty';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TaskPayload } from '@/lib/validation/task';
import { Goal, Priority, RepeatDay } from '@/types';
import { cn } from '@/utils/cn';

import DatePicker from '../DatePicker/DatePicker';
import Input from '../Input/Input';
import Typography from '../Typography/Typography';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';

interface FormState {
  form: UseFormReturn<TaskPayload>;
}

const FormContext = createContext<FormState | null>(null);
const useFormContext = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('폼 컴포넌트는 Form 컴포넌트 내부에서 사용되어야 합니다.');
  return ctx;
};

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  form: UseFormReturn<TaskPayload>;
}

const Form = ({ children, form, ...props }: FormProps) => {
  return (
    <FormContext.Provider value={{ form }}>
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
  const { form } = useFormContext();
  const inputId = React.useId();
  return (
    <>
      <label htmlFor={inputId}>
        <Typography variant='body3-semibold' as='span'>
          {label}
        </Typography>
      </label>
      <Controller name='title' control={form.control} render={({ field }) => <Input id={inputId} {...props} {...field} />} />
      {form.formState.errors.title && (
        <Typography variant='body3-regular' as='p' className='mt-1 text-red-500'>
          {form.formState.errors.title.message}
        </Typography>
      )}
    </>
  );
};

const DescriptionField = ({ label, ...props }: TaskFieldProps) => {
  const { form } = useFormContext();
  const inputId = React.useId();
  return (
    <>
      <label htmlFor={inputId}>
        <Typography variant='body3-semibold' as='span'>
          {label}
        </Typography>
      </label>
      <Controller
        name='description'
        control={form.control}
        render={({ field }) => <Input id={inputId} {...props} {...field} value={field.value || ''} />}
      />
    </>
  );
};

interface SelectPriortyFieldProps {
  className?: string;
}

const SelectPriortyField = ({ className }: SelectPriortyFieldProps) => {
  const { form } = useFormContext();
  const triggerId = React.useId();

  return (
    <div className={cn('w-full', className)}>
      <label htmlFor={triggerId}>
        <Typography variant='body3-semibold' as='span'>
          우선순위
        </Typography>
      </label>
      <Controller
        name='priority'
        control={form.control}
        render={({ field }) => (
          <SelectProirty
            value={field.value}
            onChange={(p) => field.onChange(p as Priority)}
            className='w-full'
            triggerProps={{ id: triggerId }}
          />
        )}
      />
      {form.formState.errors.priority && (
        <Typography variant='body3-regular' as='p' className='mt-1 text-red-500'>
          {form.formState.errors.priority.message}
        </Typography>
      )}
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
  const { form } = useFormContext();
  const triggerId = React.useId();
  return (
    <div className={cn('w-full', className)}>
      <label htmlFor={triggerId}>
        <Typography variant='body3-semibold' as='span'>
          목표
        </Typography>
      </label>
      <Controller
        name='goalId'
        control={form.control}
        render={({ field }) => (
          <Select value={field.value || ''} onValueChange={(value) => field.onChange(value || undefined)}>
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
        )}
      />
    </div>
  );
};

const REPEAT_DAYS: RepeatDay[] = ['월', '화', '수', '목', '금', '토', '일'];

const RepeatButtonGroup = ({ className }: { className?: string }) => {
  const { form } = useFormContext();
  const repeatDays = form.watch('repeatDays') || [];

  return (
    <fieldset className={cn('w-full', className)}>
      <legend>
        <Typography variant='body3-semibold' as='span'>
          반복 요일
        </Typography>
      </legend>
      <div className={cn('flex flex-wrap justify-between')}>
        {REPEAT_DAYS.map((day) => {
          const isSelected = repeatDays.includes(day);

          return (
            <Button
              key={day}
              onClick={() => {
                const currentDays = form.getValues('repeatDays') || [];
                const newDays = currentDays.includes(day) ? currentDays.filter((d) => d !== day) : [...currentDays, day];
                form.setValue('repeatDays', newDays);
              }}
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
  const { form } = useFormContext();
  const [open, setOpen] = React.useState(false);
  const triggerId = React.useId();

  return (
    <div className='w-full'>
      <label htmlFor={triggerId}>
        <Typography variant='body3-semibold' as='span'>
          날짜
        </Typography>
      </label>
      <Controller
        name='startDate'
        control={form.control}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                type='button'
                className='w-full rounded-2xl border border-gray-300 bg-white px-3 py-2 text-left'
                onClick={() => setOpen(!open)}
                id={triggerId}
              >
                {field.value ? format(new Date(field.value), 'yyyy-MM-dd') : '날짜 선택'}
              </button>
            </PopoverTrigger>
            <PopoverContent align='start' sideOffset={8} className='w-auto border-none bg-white p-0 shadow-none'>
              <DatePicker
                date={field.value ? new Date(field.value) : new Date()}
                onDateChange={(date) => {
                  field.onChange(date);
                  form.setValue('createdAt', date);
                  setOpen(false);
                }}
                closeSelector={() => setOpen(false)}
              />
            </PopoverContent>
          </Popover>
        )}
      />
      {form.formState.errors.startDate && (
        <Typography variant='body3-regular' as='p' className='mt-1 text-red-500'>
          {form.formState.errors.startDate.message}
        </Typography>
      )}
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
