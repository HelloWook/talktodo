import { render, screen } from '@testing-library/react';

import type { Task } from '@/types/Task';

import ListView from './ListView';

interface MockCardProps {
  children: React.ReactNode;
  className?: string;
}

interface MockCardProviderProps {
  children: React.ReactNode;
  task: Task;
}

// Mock Card component
jest.mock('./Card', () => {
  const MockCard = ({ children, className }: MockCardProps) => <div className={className}>{children}</div>;
  MockCard.displayName = 'MockCard';

  const MockProvider = ({ children, task }: MockCardProviderProps) => (
    <div data-testid='list-view-item' data-task-id={task.id}>
      {children}
    </div>
  );
  MockProvider.displayName = 'MockCard.Provider';
  MockCard.Provider = MockProvider;

  const MockTitle = () => <div data-testid='card-title'>작업 제목</div>;
  MockTitle.displayName = 'MockCard.Title';
  MockCard.Title = MockTitle;

  const MockDescription = () => <div data-testid='card-description'>작업 설명</div>;
  MockDescription.displayName = 'MockCard.Description';
  MockCard.Description = MockDescription;

  const MockData = () => <div data-testid='card-data'>작업 데이터</div>;
  MockData.displayName = 'MockCard.Data';
  MockCard.Data = MockData;

  const MockItem = () => <div data-testid='card-item'>작업 아이템</div>;
  MockItem.displayName = 'MockCard.Item';
  MockCard.Item = MockItem;

  return MockCard;
});

// Mock cn utility
jest.mock('@/utils/cn', () => ({
  cn: (...classes: unknown[]) => classes.filter(Boolean).join(' '),
}));

describe('ListView', () => {
  const mockTask: Task = {
    id: '1',
    title: '영어 공부하기',
    description: '영어 단어 50개 외우기',
    priority: '중요',
    isDone: false,
    memo: '',
    repeatDays: ['월', '화', '수', '목', '금'],
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-03-20'),
    goal: { id: 'g1', name: '학습' },
  };

  const mockHandlers = {
    onToggleDone: jest.fn(),
    onOpenMemo: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('리스트 형태로 작업을 표시한다', () => {
    render(<ListView task={mockTask} onToggleDone={mockHandlers.onToggleDone} onOpenMemo={mockHandlers.onOpenMemo} />);

    expect(screen.getByTestId('list-view-item')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toBeInTheDocument();
    expect(screen.getByTestId('card-description')).toBeInTheDocument();
    expect(screen.getByTestId('card-data')).toBeInTheDocument();
    expect(screen.getByTestId('card-item')).toBeInTheDocument();
  });
});
