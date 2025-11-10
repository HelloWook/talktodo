import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Task, Goal } from '@/types';

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
  onChange: (value: string) => void;
  triggerProps?: { id?: string };
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

// Mock dependencies
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
    return (
      <Component className={className} data-variant={variant}>
        {children}
      </Component>
    );
  };
});

jest.mock('../SelectPriorty/SelectPriorty', () => {
  return function MockSelectPriority({ onChange, triggerProps }: MockSelectPriorityProps) {
    return (
      <button onClick={() => onChange('중요')} data-testid='select-priority' id={triggerProps?.id}>
        우선순위 선택
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

describe('Form', () => {
  const mockTask: Task = {
    id: '1',
    title: '프로젝트 기획서 작성',
    description: '2024년 1분기 프로젝트 기획',
    priority: '중요',
    isDone: false,
    memo: '',
    repeatDays: ['월', '수', '금'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    goal: { id: 'g1', name: '업무' },
  };

  const mockOnTaskChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('작업 추가/수정 폼을 표시한다', () => {
    render(
      <Form task={mockTask} onTaskChange={mockOnTaskChange}>
        <Form.Header title='새 작업 추가' onClose={() => {}} />
        <Form.TitleField label='제목' value={mockTask.title} />
      </Form>,
    );

    expect(screen.getByText('새 작업 추가')).toBeInTheDocument();
    expect(screen.getByText('제목')).toBeInTheDocument();
  });

  it('제목을 입력할 수 있다', async () => {
    const user = userEvent.setup();

    render(
      <Form task={mockTask} onTaskChange={mockOnTaskChange}>
        <Form.TitleField label='제목' value={mockTask.title} />
      </Form>,
    );

    const input = screen.getByTestId('mock-input');
    await user.type(input, '회의');

    expect(mockOnTaskChange).toHaveBeenCalled();
  });

  it('설명을 입력할 수 있다', async () => {
    const user = userEvent.setup();

    render(
      <Form task={mockTask} onTaskChange={mockOnTaskChange}>
        <Form.DescriptionField label='설명' value={mockTask.description} />
      </Form>,
    );

    const input = screen.getByTestId('mock-input');
    await user.type(input, ' 준비');

    expect(mockOnTaskChange).toHaveBeenCalled();
  });

  it('우선순위를 선택할 수 있다', async () => {
    const user = userEvent.setup();

    render(
      <Form task={mockTask} onTaskChange={mockOnTaskChange}>
        <Form.SelectPriortyField />
      </Form>,
    );

    await user.click(screen.getByTestId('select-priority'));
    expect(mockOnTaskChange).toHaveBeenCalled();
  });

  it('목표를 선택할 수 있다', () => {
    const goals: Goal[] = [
      { id: 'g1', name: '업무' },
      { id: 'g2', name: '개인 발전' },
      { id: 'g3', name: '건강' },
    ];

    render(
      <Form task={mockTask} onTaskChange={mockOnTaskChange}>
        <Form.GoalSelector goals={goals} />
      </Form>,
    );

    expect(screen.getByText('업무')).toBeInTheDocument();
    expect(screen.getByText('개인 발전')).toBeInTheDocument();
    expect(screen.getByText('건강')).toBeInTheDocument();
  });

  it('반복 요일을 선택할 수 있다', async () => {
    const user = userEvent.setup();

    render(
      <Form task={mockTask} onTaskChange={mockOnTaskChange}>
        <Form.RepeatButtonGroup />
      </Form>,
    );

    // 월요일부터 일요일까지 모든 요일이 표시됨
    ['월', '화', '수', '목', '금', '토', '일'].forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });

    // 요일 선택
    await user.click(screen.getByText('화'));
    expect(mockOnTaskChange).toHaveBeenCalled();
  });

  it('날짜를 선택할 수 있다', () => {
    render(
      <Form task={mockTask} onTaskChange={mockOnTaskChange}>
        <Form.DateField />
      </Form>,
    );

    expect(screen.getByText('날짜')).toBeInTheDocument();
    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
  });

  it('폼을 제출할 수 있다', () => {
    render(
      <Form task={mockTask} onTaskChange={mockOnTaskChange}>
        <Form.FormActions />
      </Form>,
    );

    const submitButton = screen.getByRole('button', { name: '완료하기' });
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('닫기 버튼을 클릭하면 폼이 닫힌다', async () => {
    const mockOnClose = jest.fn();
    const user = userEvent.setup();

    render(
      <Form task={mockTask} onTaskChange={mockOnTaskChange}>
        <Form.Header title='작업 수정' onClose={mockOnClose} />
      </Form>,
    );

    await user.click(screen.getByLabelText('닫기'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
