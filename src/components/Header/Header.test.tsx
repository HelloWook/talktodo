import { render, screen } from '@testing-library/react';

import { Task } from '@/types';

import Header from './Header';

// window.matchMedia 모킹
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

const makeTask = (overrides?: Partial<Task>): Task => ({
  id: overrides?.id ?? '1',
  title: overrides?.title ?? '작업',
  description: overrides?.description ?? '',
  memo: overrides?.memo ?? '',
  priority: overrides?.priority ?? '보통',
  repeatDays: overrides?.repeatDays ?? [],
  startDate: overrides?.startDate ?? new Date().toISOString(),
  userId: overrides?.userId ?? '1',
  isDone: overrides?.isDone ?? false,
  goal: overrides?.goal ?? { id: 'g1', name: '건강', userId: '1' },
});

describe('Header', () => {
  it('미완료 상태에서 총 건수 문구를 표시한다', () => {
    const tasks: Task[] = [makeTask({ id: '1', isDone: true }), makeTask({ id: '2', isDone: false })];

    render(
      <Header.Provider tasks={tasks}>
        <Header>
          <Header.Content />
        </Header>
      </Header.Provider>,
    );

    expect(screen.getByText(/총 2건/)).toBeInTheDocument();
    expect(screen.getByText('의 할 일이 있어요')).toBeInTheDocument();
    expect(screen.getByText('오늘의 진행률')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('완료 상태에서 완료 문구를 표시한다', () => {
    const tasks: Task[] = [makeTask({ id: '1', isDone: true }), makeTask({ id: '2', isDone: true })];

    render(
      <Header.Provider tasks={tasks}>
        <Header>
          <Header.Content />
        </Header>
      </Header.Provider>,
    );

    expect(screen.getByText('할 일을 모두 완료했어요!')).toBeInTheDocument();
    expect(screen.getByText('오늘의 진행률')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('TodoStats가 총/미완료/완료 수치를 올바르게 표시한다', () => {
    const tasks: Task[] = [makeTask({ id: '1', isDone: true }), makeTask({ id: '2', isDone: false }), makeTask({ id: '3', isDone: true })];

    render(
      <Header.Provider tasks={tasks}>
        <Header>
          <Header.Content />
        </Header>
      </Header.Provider>,
    );

    expect(screen.getByText('3')).toBeInTheDocument(); // 총 일정
    expect(screen.getByText('1')).toBeInTheDocument(); // 미완료
    expect(screen.getByText('2')).toBeInTheDocument(); // 완료
  });

  it('완료 여부에 따라 캐릭터 이미지가 바뀐다', () => {
    const { rerender } = render(
      <Header.Provider tasks={[makeTask({ id: '1', isDone: false })]}>
        <Header>
          <Header.Content />
        </Header>
      </Header.Provider>,
    );

    const img = screen.getByAltText('character') as HTMLImageElement;
    expect(img.getAttribute('src') || '').toContain('UnCompletedCharacter.png');

    rerender(
      <Header.Provider tasks={[makeTask({ id: '1', isDone: true })]}>
        <Header>
          <Header.Content />
        </Header>
      </Header.Provider>,
    );
    const img2 = screen.getByAltText('character') as HTMLImageElement;
    expect(img2.getAttribute('src') || '').toContain('CompletedCharacter.png');
  });
});
