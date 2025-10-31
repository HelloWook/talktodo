import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

import DialogContainer from './DialogContainer';
import { dialogService } from './dialogService';

// useMount 훅 모킹
jest.mock('@/hooks/useMount', () => ({
  __esModule: true,
  default: () => true,
}));

// createPortal 모킹
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (children: React.ReactNode) => children,
}));

// DialogContainer는 내부 컴포넌트이므로 기본 렌더링만 확인
describe('DialogContainer', () => {
  beforeEach(() => {
    dialogService.reset();

    const dialogRoot = document.createElement('div');
    dialogRoot.id = 'dialog-root';
    document.body.appendChild(dialogRoot);
  });

  afterEach(() => {
    dialogService.reset();
    const dialogRoot = document.getElementById('dialog-root');
    if (dialogRoot) {
      document.body.removeChild(dialogRoot);
    }
  });

  it('다이얼로그 content를 렌더링한다', async () => {
    const { rerender } = render(<DialogContainer />);

    act(() => {
      dialogService.openDialog(<div>테스트 다이얼로그</div>);
    });

    rerender(<DialogContainer />);

    await waitFor(
      () => {
        expect(screen.getByText('테스트 다이얼로그')).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it('다이얼로그 내부의 인터랙션이 작동한다', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    const { rerender } = render(<DialogContainer />);

    act(() => {
      dialogService.openDialog(<button onClick={handleClick}>클릭</button>);
    });

    rerender(<DialogContainer />);

    await waitFor(
      () => {
        expect(screen.getByText('클릭')).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    await user.click(screen.getByText('클릭'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
