import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import { Task } from '@/types/Task';

import Card from './Card';

// Mock task data
const mockTask: Task = {
  id: '1',
  title: '테스트 작업',
  description: '테스트 설명',
  priority: '보통',
  isDone: false,
  memo: '',
  repeatDays: ['월', '화', '수', '목', '금', '토', '일'],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockTaskDone: Task = {
  ...mockTask,
  isDone: true,
};

const mockHandlers = {
  onToggleDone: jest.fn(),
  onOpenMemo: jest.fn(),
};

describe('Card', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('Card.Provider와 Card 기본 렌더링', () => {
    it('Card가 올바르게 렌더링된다', () => {
      render(
        <Card.Provider task={mockTask} onToggleDone={mockHandlers.onToggleDone} onOpenMemo={mockHandlers.onOpenMemo}>
          <Card>
            <Card.Title />
            <Card.Description />
            <Card.Data />
            <Card.Item />
          </Card>
        </Card.Provider>,
      );

      expect(screen.getByRole('article')).toBeInTheDocument();
      expect(screen.getByText('테스트 작업')).toBeInTheDocument();
      expect(screen.getByText('테스트 설명')).toBeInTheDocument();
    });

    it('Card가 적절한 aria-label을 가진다', () => {
      render(
        <Card.Provider task={mockTask} onToggleDone={mockHandlers.onToggleDone} onOpenMemo={mockHandlers.onOpenMemo}>
          <Card>
            <Card.Title />
          </Card>
        </Card.Provider>,
      );

      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('aria-label', '작업: 테스트 작업');
    });
  });

  describe('Card.Title', () => {
    it('완료되지 않은 작업의 제목이 올바르게 렌더링된다', () => {
      render(
        <Card.Provider task={mockTask} onToggleDone={mockHandlers.onToggleDone} onOpenMemo={mockHandlers.onOpenMemo}>
          <Card>
            <Card.Title />
          </Card>
        </Card.Provider>,
      );

      const title = screen.getByText('테스트 작업');
      expect(title).toHaveClass('text-gray-900');
      expect(title).not.toHaveClass('line-through');
    });

    it('완료된 작업의 제목이 올바르게 렌더링된다', () => {
      render(
        <Card.Provider task={mockTaskDone} onToggleDone={mockHandlers.onToggleDone} onOpenMemo={mockHandlers.onOpenMemo}>
          <Card>
            <Card.Title />
          </Card>
        </Card.Provider>,
      );

      const title = screen.getByText('테스트 작업');
      expect(title).toHaveClass('text-gray-400', 'line-through');
    });
  });

  describe('Card.Description', () => {
    it('설명이 올바르게 렌더링된다', () => {
      render(
        <Card.Provider task={mockTask} onToggleDone={mockHandlers.onToggleDone} onOpenMemo={mockHandlers.onOpenMemo}>
          <Card>
            <Card.Description />
          </Card>
        </Card.Provider>,
      );

      expect(screen.getByText('테스트 설명')).toBeInTheDocument();
      expect(screen.getByText('테스트 설명')).toHaveClass('text-gray-400');
    });
  });

  describe('Card.Data', () => {
    it('우선순위와 반복 정보가 올바르게 렌더링된다', () => {
      render(
        <Card.Provider task={mockTask} onToggleDone={mockHandlers.onToggleDone} onOpenMemo={mockHandlers.onOpenMemo}>
          <Card>
            <Card.Data />
          </Card>
        </Card.Provider>,
      );

      expect(screen.getByText('보통')).toBeInTheDocument();
      expect(screen.getByText('보통')).toHaveClass('text-yellow-500');
    });
  });

  describe('Card.Item - 상호작용', () => {
    it('메모 버튼 클릭 시 onOpenMemo가 호출된다', () => {
      render(
        <Card.Provider task={mockTask} onToggleDone={mockHandlers.onToggleDone} onOpenMemo={mockHandlers.onOpenMemo}>
          <Card>
            <Card.Item />
          </Card>
        </Card.Provider>,
      );

      const memoButton = screen.getByLabelText('테스트 작업 메모 열기');
      fireEvent.click(memoButton);

      expect(mockHandlers.onOpenMemo).toHaveBeenCalledWith('1');
    });

    it('완료 토글 버튼 클릭 시 onToggleDone이 호출된다', () => {
      render(
        <Card.Provider task={mockTask} onToggleDone={mockHandlers.onToggleDone} onOpenMemo={mockHandlers.onOpenMemo}>
          <Card>
            <Card.Item />
          </Card>
        </Card.Provider>,
      );

      const toggleButton = screen.getByLabelText('테스트 작업 완료 처리');
      fireEvent.click(toggleButton);

      expect(mockHandlers.onToggleDone).toHaveBeenCalledWith('1');
    });
  });

  describe('Card 스타일링', () => {
    it('완료되지 않은 작업의 카드가 올바른 스타일을 가진다', () => {
      render(
        <Card.Provider task={mockTask} onToggleDone={mockHandlers.onToggleDone} onOpenMemo={mockHandlers.onOpenMemo}>
          <Card>
            <Card.Title />
          </Card>
        </Card.Provider>,
      );

      const card = screen.getByRole('article');
      expect(card).toHaveClass('bg-white');
      expect(card).not.toHaveClass('bg-purple-200');
    });

    it('완료된 작업의 카드가 올바른 스타일을 가진다', () => {
      render(
        <Card.Provider task={mockTaskDone} onToggleDone={mockHandlers.onToggleDone} onOpenMemo={mockHandlers.onOpenMemo}>
          <Card>
            <Card.Title />
          </Card>
        </Card.Provider>,
      );

      const card = screen.getByRole('article');
      expect(card).toHaveClass('bg-purple-200');
      expect(card).not.toHaveClass('bg-white');
    });
  });
});
