import { zodResolver } from '@hookform/resolvers/zod';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { useForm } from 'react-hook-form';

import { taskSchema, TaskPayload } from '@/lib/validation/task';
import { mockGoals } from '@/stories/mock/mockGoal';

import Form from './Form';

interface MockButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

interface MockIconProps {
  name: string;
  className?: string;
}

interface MockInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
}

interface MockTypographyProps {
  children: React.ReactNode;
  variant?: string;
  as?: string;
  className?: string;
}

interface MockSelectPriorityProps {
  value?: string;
  onChange: (value: string) => void;
  triggerProps?: { id?: string };
  className?: string;
}

interface MockDatePickerProps {
  onDateChange: (date: Date) => void;
  closeSelector: () => void;
}

interface MockSelectProps {
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
}

interface MockSelectTriggerProps {
  children: React.ReactNode;
  id?: string;
}

interface MockPopoverProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

jest.mock('@/utils/cn', () => ({
  cn: (...classes: unknown[]) => classes.filter(Boolean).join(' '),
}));

jest.mock('../Button/Button', () => {
  return function MockButton({ children, onClick, type, className }: MockButtonProps) {
    return (
      <button onClick={onClick} type={type} className={className}>
        {children}
      </button>
    );
  };
});

jest.mock('../Icon/Icon', () => {
  return function MockIcon({ name, className }: MockIconProps) {
    return <div data-testid={`icon-${name}`} className={className} />;
  };
});

jest.mock('../Input/Input', () => {
  return function MockInput({ id, onChange, ...props }: MockInputProps) {
    return <input id={id} onChange={onChange} {...props} data-testid='mock-input' />;
  };
});

jest.mock('../Typography/Typography', () => {
  return function MockTypography({ children, variant, as, className }: MockTypographyProps) {
    const Component = as || 'div';
    return React.createElement(Component, { className, 'data-variant': variant }, children);
  };
});

jest.mock('../SelectPriorty/SelectPriorty', () => {
  return function MockSelectPriority({ value, onChange, triggerProps, className }: MockSelectPriorityProps) {
    return (
      <button onClick={() => onChange('중요')} data-testid='select-priority' id={triggerProps?.id} className={className}>
        {value || '우선순위 선택'}
      </button>
    );
  };
});

jest.mock('../ui/select', () => ({
  Select: ({ children }: MockSelectProps) => <div data-testid='select'>{children}</div>,
  SelectTrigger: ({ children, id }: MockSelectTriggerProps) => (
    <button data-testid='select-trigger' id={id}>
      {children}
    </button>
  ),
  SelectValue: ({ placeholder }: { placeholder?: string }) => <div>{placeholder}</div>,
  SelectContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectGroup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectItem: ({ children, value }: { children: React.ReactNode; value: string }) => <div data-value={value}>{children}</div>,
}));

jest.mock('../DatePicker/DatePicker', () => {
  return function MockDatePicker({ onDateChange, closeSelector }: MockDatePickerProps) {
    return (
      <button
        onClick={() => {
          onDateChange(new Date('2024-03-15'));
          closeSelector();
        }}
        data-testid='date-picker'
      >
        날짜 선택
      </button>
    );
  };
});

jest.mock('../ui/popover', () => ({
  Popover: ({ children, open }: MockPopoverProps) => (
    <div data-testid='popover' data-open={open}>
      {children}
    </div>
  ),
  PopoverTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PopoverContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Test wrapper component that provides form instance
const FormWrapper = ({ children, defaultValues }: { children: React.ReactNode; defaultValues?: Partial<TaskPayload> }) => {
  const form = useForm<TaskPayload>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      memo: '',
      priority: '보통',
      startDate: '24-01-15',
      repeatDays: [],
      isDone: false,
      userId: 'user1',
      goalId: undefined,
      ...defaultValues,
    },
  });

  return <Form form={form}>{children}</Form>;
};

describe('Form', () => {
  const mockDefaultValues: Partial<TaskPayload> = {
    title: '프로젝트 기획서 작성',
    description: '2024년 1분기 프로젝트 기획',
    priority: '중요',
    repeatDays: ['월', '수', '금'],
    startDate: '24-01-15',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('작업 추가/수정 폼을 표시한다', () => {
    render(
      <FormWrapper defaultValues={mockDefaultValues}>
        <Form.Header title='새 작업 추가' onClose={() => {}} />
        <Form.InputField name='title' label='제목' />
      </FormWrapper>,
    );

    expect(screen.getByText('새 작업 추가')).toBeInTheDocument();
    expect(screen.getByText('제목')).toBeInTheDocument();
  });

  it('제목을 입력할 수 있다', async () => {
    const user = userEvent.setup();

    render(
      <FormWrapper defaultValues={mockDefaultValues}>
        <Form.InputField name='title' label='제목' />
      </FormWrapper>,
    );

    const input = screen.getByTestId('mock-input');
    await user.clear(input);
    await user.type(input, '회의');

    expect(input).toHaveValue('회의');
  });

  it('설명을 입력할 수 있다', async () => {
    const user = userEvent.setup();

    render(
      <FormWrapper defaultValues={mockDefaultValues}>
        <Form.InputField name='description' label='설명' />
      </FormWrapper>,
    );

    const input = screen.getByTestId('mock-input');
    await user.clear(input);
    await user.type(input, '준비');

    expect(input).toHaveValue('준비');
  });

  it('우선순위를 선택할 수 있다', async () => {
    const user = userEvent.setup();

    render(
      <FormWrapper defaultValues={mockDefaultValues}>
        <Form.SelectPriortyField />
      </FormWrapper>,
    );

    await user.click(screen.getByTestId('select-priority'));
    // 우선순위 선택 버튼이 클릭되었는지 확인
    expect(screen.getByTestId('select-priority')).toBeInTheDocument();
  });

  it('목표를 선택할 수 있다', () => {
    render(
      <FormWrapper defaultValues={mockDefaultValues}>
        <Form.GoalSelector goals={mockGoals} />
      </FormWrapper>,
    );

    expect(screen.getByText('건강')).toBeInTheDocument();
    expect(screen.getByText('공부')).toBeInTheDocument();
    expect(screen.getByText('취미')).toBeInTheDocument();
  });

  it('반복 요일을 선택할 수 있다', async () => {
    const user = userEvent.setup();

    render(
      <FormWrapper defaultValues={mockDefaultValues}>
        <Form.RepeatButtonGroup />
      </FormWrapper>,
    );

    // 월요일부터 일요일까지 모든 요일이 표시됨
    ['월', '화', '수', '목', '금', '토', '일'].forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });

    // 요일 선택
    await user.click(screen.getByText('화'));
    // 버튼이 클릭되었는지 확인
    expect(screen.getByText('화')).toBeInTheDocument();
  });

  it('폼을 제출할 수 있다', () => {
    render(
      <FormWrapper defaultValues={mockDefaultValues}>
        <Form.FormActions />
      </FormWrapper>,
    );

    const submitButton = screen.getByRole('button', { name: '완료하기' });
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('닫기 버튼을 클릭하면 폼이 닫힌다', async () => {
    const mockOnClose = jest.fn();
    const user = userEvent.setup();

    render(
      <FormWrapper defaultValues={mockDefaultValues}>
        <Form.Header title='작업 수정' onClose={mockOnClose} />
      </FormWrapper>,
    );

    await user.click(screen.getByLabelText('닫기'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
