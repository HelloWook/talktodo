import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import SideBar from './SideBar';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock Icon component
jest.mock('@/components/Icon/Icon', () => {
  return function MockIcon({ name }: { name: string }) {
    return <span data-testid={`icon-${name}`}>{name}</span>;
  };
});

// Mock Button component
jest.mock('@/components/Button/Button', () => {
  return function MockButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
    return (
      <button onClick={onClick} data-testid='button'>
        {children}
      </button>
    );
  };
});

// Mock Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} />;
  };
});

describe('SideBar - 컴파운드 패턴', () => {
  const mockPush = jest.fn();
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

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
  });

  afterEach(() => {
    cleanup();
  });

  it('사용자 정보와 메뉴 아이템을 표시한다', () => {
    render(
      <SideBar>
        <SideBar.Content>
          <SideBar.Header />
          <SideBar.MenuGroup title='목표' icon='flag'>
            <SideBar.MenuItem label='운동' onClick={() => {}} />
            <SideBar.MenuItem label='독서' onClick={() => {}} />
          </SideBar.MenuGroup>
        </SideBar.Content>
        <SideBar.Footer>
          <SideBar.ProfileSection userNickname='홍길동' userEmail='hong@example.com' />
        </SideBar.Footer>
      </SideBar>,
    );

    expect(screen.getByText('홍길동')).toBeInTheDocument();
    expect(screen.getByText('hong@example.com')).toBeInTheDocument();
    expect(screen.getByText('운동')).toBeInTheDocument();
    expect(screen.getByText('독서')).toBeInTheDocument();
  });

  it('메뉴 아이템을 클릭하면 onClick 핸들러가 실행된다', () => {
    const handleClick = jest.fn();

    render(
      <SideBar>
        <SideBar.Content>
          <SideBar.Header />
          <SideBar.MenuGroup title='목표' icon='flag'>
            <SideBar.MenuItem label='운동' onClick={handleClick} />
          </SideBar.MenuGroup>
        </SideBar.Content>
        <SideBar.Footer>
          <SideBar.ProfileSection userNickname='홍길동' userEmail='hong@example.com' />
        </SideBar.Footer>
      </SideBar>,
    );

    fireEvent.click(screen.getByText('운동'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('새 목표 버튼을 클릭하면 onClick 핸들러가 실행된다', () => {
    const handleNewGoal = jest.fn();

    render(
      <SideBar>
        <SideBar.Content>
          <SideBar.Header />
          <SideBar.NewGoalButton onClick={handleNewGoal} />
        </SideBar.Content>
        <SideBar.Footer>
          <SideBar.ProfileSection userNickname='홍길동' userEmail='hong@example.com' />
        </SideBar.Footer>
      </SideBar>,
    );

    const button = screen.getByTestId('button');
    fireEvent.click(button);

    expect(handleNewGoal).toHaveBeenCalledTimes(1);
  });

  it('프로필을 클릭하면 마이페이지로 이동한다', () => {
    render(
      <SideBar>
        <SideBar.Content>
          <SideBar.Header />
        </SideBar.Content>
        <SideBar.Footer>
          <SideBar.ProfileSection userNickname='홍길동' userEmail='hong@example.com' />
        </SideBar.Footer>
      </SideBar>,
    );

    const profile = screen.getByAltText('profile').parentElement;
    if (profile) {
      fireEvent.click(profile);
      expect(mockPush).toHaveBeenCalledWith('/mypage');
    }
  });
});
