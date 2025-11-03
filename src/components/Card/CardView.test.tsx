import { render, screen } from '@testing-library/react';

import type { Task } from '@/types/Task';

import CardView from './CardView';

interface MockCardProps {
  children: React.ReactNode;
  className?: string;
}

interface MockCardProviderProps {
  children: React.ReactNode;
  task: Task;
}

interface MockCardSubComponentProps {
  className?: string;
}

// Mock Card component
jest.mock('./Card', () => {
  const MockCard = ({ children, className }: MockCardProps) => <div className={className}>{children}</div>;
  MockCard.displayName = 'MockCard';

  const MockProvider = ({ children, task }: MockCardProviderProps) => (
    <div data-testid='card-provider' data-task-id={task.id}>
      {children}
    </div>
  );
  MockProvider.displayName = 'MockCard.Provider';
  MockCard.Provider = MockProvider;

  const MockTitle = ({ className }: MockCardSubComponentProps) => (
    <div className={className} data-testid='card-title'>
      작업 제목
    </div>
  );
  MockTitle.displayName = 'MockCard.Title';
  MockCard.Title = MockTitle;

  const MockDescription = ({ className }: MockCardSubComponentProps) => (
    <div className={className} data-testid='card-description'>
      작업 설명
    </div>
  );
  MockDescription.displayName = 'MockCard.Description';
  MockCard.Description = MockDescription;

  const MockData = ({ className }: MockCardSubComponentProps) => (
    <div className={className} data-testid='card-data'>
      작업 데이터
    </div>
  );
  MockData.displayName = 'MockCard.Data';
  MockCard.Data = MockData;

  const MockItem = ({ className }: MockCardSubComponentProps) => (
    <div className={className} data-testid='card-item'>
      작업 아이템
    </div>
  );
  MockItem.displayName = 'MockCard.Item';
  MockCard.Item = MockItem;

  return MockCard;
});

describe('CardView', () => {
  const mockTask: Task = {
    id: '1',
    title: '운동하기',
    description: '헬스장에서 운동 1시간',
    priority: '보통',
    isDone: false,
    memo: '',
    repeatDays: ['월', '수', '금'],
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-03-20'),
    goal: { id: 'g1', name: '건강' },
  };

  const mockHandlers = {
    onToggleDone: jest.fn(),
    onOpenMemo: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('카드 형태로 작업을 표시한다', () => {
    render(<CardView task={mockTask} onToggleDone={mockHandlers.onToggleDone} onOpenMemo={mockHandlers.onOpenMemo} />);

    expect(screen.getByTestId('card-title')).toBeInTheDocument();
    expect(screen.getByTestId('card-description')).toBeInTheDocument();
    expect(screen.getByTestId('card-data')).toBeInTheDocument();
    expect(screen.getByTestId('card-item')).toBeInTheDocument();
  });
});
