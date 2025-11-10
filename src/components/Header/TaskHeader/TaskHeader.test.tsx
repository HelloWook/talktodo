import { render, screen } from '@testing-library/react';

import type { Task } from '@/types';

import TaskHeader from './TaskHeader';

interface MockHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MockHeaderProviderProps {
  children: React.ReactNode;
  tasks: Task[];
}

// Mock Header component
jest.mock('../Header', () => {
  const MockHeader = ({ children, className }: MockHeaderProps) => <div className={className}>{children}</div>;
  MockHeader.displayName = 'MockHeader';

  const MockProvider = ({ children, tasks }: MockHeaderProviderProps) => (
    <div data-testid='task-header' data-tasks-length={tasks.length}>
      {children}
    </div>
  );
  MockProvider.displayName = 'MockHeader.Provider';
  MockHeader.Provider = MockProvider;

  const MockContent = () => <div data-testid='header-content'>완료율: 50%</div>;
  MockContent.displayName = 'MockHeader.Content';
  MockHeader.Content = MockContent;

  return MockHeader;
});

describe('TaskHeader', () => {
  it('작업 목록을 기반으로 헤더를 표시한다', () => {
    const tasks: Task[] = [
      {
        id: '1',
        title: '프로젝트 기획서 작성',
        description: '분기별 프로젝트 기획',
        priority: '중요',
        isDone: false,
        memo: '',
        repeatDays: [],
        createdAt: new Date('2024-03-20'),
        updatedAt: new Date('2024-03-20'),
        goal: { id: 'g1', name: '업무' },
      },
      {
        id: '2',
        title: '코드 리뷰',
        description: 'PR 검토 및 피드백',
        priority: '보통',
        isDone: true,
        memo: '',
        repeatDays: [],
        createdAt: new Date('2024-03-20'),
        updatedAt: new Date('2024-03-20'),
        goal: { id: 'g1', name: '업무' },
      },
    ];

    render(<TaskHeader tasks={tasks} />);

    expect(screen.getByTestId('task-header')).toBeInTheDocument();
    expect(screen.getByTestId('header-content')).toBeInTheDocument();
  });

  it('작업이 없을 때도 헤더를 표시한다', () => {
    render(<TaskHeader tasks={[]} />);

    const header = screen.getByTestId('task-header');
    expect(header).toHaveAttribute('data-tasks-length', '0');
  });
});
