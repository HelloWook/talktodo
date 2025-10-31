import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import { Task } from '@/types/Task';

import TaskViewContainer from './TaskViewContainer';
import { EmptyTaskStateProps } from './TaskViewContainer.types';

// Mock utilities
jest.mock('@/utils/cn', () => ({
  cn: (...classes: unknown[]) => classes.filter(Boolean).join(' '),
}));

jest.mock('@/utils/getRepeatData', () => ({
  getRepeatData: (days: string[]) => days.join(', '),
}));

// Mock Icon components
jest.mock('@/components/Icon/Icon', () => {
  // eslint-disable-next-line react/display-name
  return ({ name, className }: { name: string; className?: string }) => <div data-testid={`icon-${name}`} className={className} />;
});

jest.mock('@/components/Dot/Dot', () => {
  // eslint-disable-next-line react/display-name
  return ({ priority }: { priority: string }) => <div data-testid={`dot-${priority}`} />;
});

jest.mock('@/components/ActiveIcon/ActiveIcon', () => {
  // eslint-disable-next-line react/display-name
  return ({ active }: { active: boolean }) => <div data-testid={`active-icon-${active}`} />;
});

// Mock Typography component
jest.mock('@/components/Typography/Typography', () => {
  // eslint-disable-next-line react/display-name
  return ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div>;
});

// Don't mock Card - use the real component with mocked dependencies

const mockTask: Task = {
  id: '1',
  title: '테스트 작업',
  description: '테스트 설명',
  priority: '보통',
  isDone: false,
  memo: '',
  repeatDays: ['월', '화'],
  createdAt: new Date(),
  updatedAt: new Date(),
  goal: { id: 'g1', name: '목표1' },
};

const mockTask2: Task = {
  id: '2',
  title: '테스트 작업 2',
  description: '테스트 설명 2',
  priority: '중요',
  isDone: false,
  memo: '',
  repeatDays: ['수', '목'],
  createdAt: new Date(),
  updatedAt: new Date(),
  goal: { id: 'g2', name: '목표2' },
};

const MockEmptyTaskState = ({ mode }: EmptyTaskStateProps) => (
  <div data-testid='empty-state'>{mode === 'todo' ? '할 일이 없습니다' : '완료한 일이 없습니다'}</div>
);

describe('TaskViewContainer', () => {
  const mockHandlers = {
    onToggleDone: jest.fn(),
    onOpenMemo: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('할 일 목록과 개수를 표시한다', () => {
    render(
      <TaskViewContainer
        items={[mockTask, mockTask2]}
        layout='square'
        type='todo'
        EmptyTaskState={MockEmptyTaskState}
        onToggleDone={mockHandlers.onToggleDone}
        onOpenMemo={mockHandlers.onOpenMemo}
      />,
    );

    expect(screen.getByText('해야할 일')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('테스트 작업')).toBeInTheDocument();
    expect(screen.getByText('테스트 작업 2')).toBeInTheDocument();
  });

  it('완료한 일 목록을 표시한다', () => {
    render(
      <TaskViewContainer
        items={[mockTask]}
        layout='rectangle'
        type='done'
        EmptyTaskState={MockEmptyTaskState}
        onToggleDone={mockHandlers.onToggleDone}
        onOpenMemo={mockHandlers.onOpenMemo}
      />,
    );

    expect(screen.getByText('완료한 일')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('할 일이 없을 때 빈 상태를 표시한다', () => {
    render(
      <TaskViewContainer
        items={[]}
        layout='square'
        type='todo'
        EmptyTaskState={MockEmptyTaskState}
        onToggleDone={mockHandlers.onToggleDone}
        onOpenMemo={mockHandlers.onOpenMemo}
      />,
    );

    expect(screen.getByText('할 일이 없습니다')).toBeInTheDocument();
  });

  it('완료 버튼을 클릭하면 작업을 완료 처리한다', () => {
    render(
      <TaskViewContainer
        items={[mockTask]}
        layout='square'
        type='todo'
        EmptyTaskState={MockEmptyTaskState}
        onToggleDone={mockHandlers.onToggleDone}
        onOpenMemo={mockHandlers.onOpenMemo}
      />,
    );

    fireEvent.click(screen.getByLabelText('테스트 작업 완료 처리'));

    expect(mockHandlers.onToggleDone).toHaveBeenCalledWith('1');
  });

  it('메모 버튼을 클릭하면 메모를 열 수 있다', () => {
    render(
      <TaskViewContainer
        items={[mockTask]}
        layout='square'
        type='todo'
        EmptyTaskState={MockEmptyTaskState}
        onToggleDone={mockHandlers.onToggleDone}
        onOpenMemo={mockHandlers.onOpenMemo}
      />,
    );

    fireEvent.click(screen.getByLabelText('테스트 작업 메모 열기'));

    expect(mockHandlers.onOpenMemo).toHaveBeenCalledWith('1');
  });
});
