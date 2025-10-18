import { render, screen, waitFor } from '@testing-library/react';

import { act } from 'react';

import AlertContainer from './AlertContainer';
import { AlertSubject } from './AlertSubject';

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

describe('AlertContainer', () => {
  beforeEach(() => {
    // 각 테스트 전에 AlertSubject 인스턴스 초기화
    const alertSubject = AlertSubject.getInstance();
    alertSubject.removeAlert();
  });

  it('AlertContainer가 렌더링된다.', () => {
    render(<AlertContainer />);
    expect(document.body).toBeInTheDocument();
  });

  it('AlertSubject를 통해 알림이 추가되면 Alert이 렌더링된다.', async () => {
    render(<AlertContainer />);

    const alertSubject = AlertSubject.getInstance();
    act(() => {
      alertSubject.addAlert({
        id: 1,
        message: '테스트 알림',
        handleClick: jest.fn(),
      });
    });

    await waitFor(() => {
      expect(screen.getByText('테스트 알림')).toBeInTheDocument();
    });
  });

  it('handleClick이 있는 알림에서 버튼이 렌더링된다.', async () => {
    const mockHandleClick = jest.fn();
    render(<AlertContainer />);

    const alertSubject = AlertSubject.getInstance();
    alertSubject.addAlert({
      id: 1,
      message: '테스트 알림',
      handleClick: mockHandleClick,
    });

    await waitFor(() => {
      expect(screen.getByText('변경사항 저장하기')).toBeInTheDocument();
    });
  });
});
