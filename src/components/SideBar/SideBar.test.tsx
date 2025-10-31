import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';

import SideBar from './SideBar';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock sub-components
jest.mock('./_components/MenuGroup', () => {
  interface MenuItem {
    id: string;
    label: string;
    onClick: () => void;
  }

  interface MenuGroupProps {
    title: string;
    items: MenuItem[];
    isFold: boolean;
    onTitleClick?: () => void;
  }

  return function MockMenuGroup({ title, items, onTitleClick }: MenuGroupProps) {
    return (
      <div data-testid='menu-group'>
        <button onClick={onTitleClick} data-testid={`menu-group-title-${title}`}>
          {title}
        </button>
        {items.map((item) => (
          <button key={item.id} onClick={item.onClick} data-testid={`menu-item-${item.id}`}>
            {item.label}
          </button>
        ))}
      </div>
    );
  };
});

jest.mock('./_components/NewGoalButton', () => {
  interface NewGoalButtonProps {
    onClick: () => void;
    isFold: boolean;
  }

  return function MockNewGoalButton({ onClick }: NewGoalButtonProps) {
    return (
      <button onClick={onClick} data-testid='new-goal-button'>
        새 목표
      </button>
    );
  };
});

jest.mock('./_components/SidebarHeader', () => {
  interface SidebarHeaderProps {
    isFold: boolean;
    onFoldToggle: () => void;
  }

  return function MockSidebarHeader({ isFold, onFoldToggle }: SidebarHeaderProps) {
    return (
      <button onClick={onFoldToggle} data-testid='fold-toggle'>
        {isFold ? 'Folded' : 'Unfolded'}
      </button>
    );
  };
});

jest.mock('./_components/SidebarProfileSection', () => {
  interface SidebarProfileSectionProps {
    userNickname: string;
    userEmail: string;
    isFold: boolean;
  }

  return function MockSidebarProfileSection({ userNickname, userEmail }: SidebarProfileSectionProps) {
    return (
      <div data-testid='profile-section'>
        <div>{userNickname}</div>
        <div>{userEmail}</div>
      </div>
    );
  };
});

jest.mock('./_components/SidebarSeparator', () => {
  return function MockSidebarSeparator() {
    return <div data-testid='separator'>Separator</div>;
  };
});

describe('SideBar', () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
  const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
    mockUsePathname.mockReturnValue('/');
  });

  afterEach(() => {
    cleanup();
  });

  it('사용자 정보와 목표 목록을 표시한다', () => {
    const goals = [
      { id: 'g1', goalName: '운동' },
      { id: 'g2', goalName: '독서' },
    ];

    render(<SideBar userNickname='홍길동' userEmail='hong@example.com' goals={goals} />);

    expect(screen.getByText('홍길동')).toBeInTheDocument();
    expect(screen.getByText('hong@example.com')).toBeInTheDocument();
    expect(screen.getByTestId('menu-item-g1')).toBeInTheDocument();
    expect(screen.getByTestId('menu-item-g2')).toBeInTheDocument();
  });

  it('목표를 클릭하면 해당 목표 페이지로 이동한다', () => {
    const goals = [{ id: 'g1', goalName: '운동' }];

    render(<SideBar userNickname='홍길동' userEmail='hong@example.com' goals={goals} />);

    fireEvent.click(screen.getByTestId('menu-item-g1'));

    expect(mockPush).toHaveBeenCalledWith('/goal/g1');
  });

  it('새 목표 버튼을 클릭하면 모달을 연다', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<SideBar userNickname='홍길동' userEmail='hong@example.com' goals={[]} />);

    fireEvent.click(screen.getByTestId('new-goal-button'));

    expect(consoleSpy).toHaveBeenCalledWith('새 목표 모달 열기');

    consoleSpy.mockRestore();
  });

  it('접기/펼치기 버튼으로 사이드바를 축소할 수 있다', () => {
    render(<SideBar userNickname='홍길동' userEmail='hong@example.com' goals={[]} />);

    expect(screen.getByText('Unfolded')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('fold-toggle'));

    expect(screen.getByText('Folded')).toBeInTheDocument();
  });
});
