import { renderHook, act } from '@testing-library/react';

import { useAlert } from './useAlert';
import { AlertSubject } from '../components/Alert/AlertSubject';

// AlertSubject 모킹
jest.mock('../components/Alert/AlertSubject');

describe('useAlert', () => {
  let mockAlertSubject: jest.Mocked<AlertSubject>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockAlertSubject = {
      addAlert: jest.fn(),
      removeAlert: jest.fn(),
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
      notify: jest.fn(),
    } as unknown as jest.Mocked<AlertSubject>;

    (AlertSubject.getInstance as jest.Mock).mockReturnValue(mockAlertSubject);
  });

  it('openAlert과 closeAlert 함수를 반환한다', () => {
    const { result } = renderHook(() => useAlert());

    expect(result.current).toHaveProperty('openAlert');
    expect(result.current).toHaveProperty('closeAlert');
    expect(typeof result.current.openAlert).toBe('function');
    expect(typeof result.current.closeAlert).toBe('function');
  });

  it('openAlert이 AlertSubject에 알림을 추가한다', () => {
    const { result } = renderHook(() => useAlert());
    const mockDate = 1234567890;

    jest.spyOn(Date, 'now').mockReturnValue(mockDate);

    const alertProps = {
      message: '테스트 알림',
      handleClick: jest.fn(),
    };

    act(() => {
      result.current.openAlert(alertProps);
    });

    expect(mockAlertSubject.addAlert).toHaveBeenCalledWith({
      id: mockDate,
      message: '테스트 알림',
      handleClick: alertProps.handleClick,
    });

    jest.restoreAllMocks();
  });

  it('handleClick 없이도 알림을 추가할 수 있다', () => {
    const { result } = renderHook(() => useAlert());
    const mockDate = 1234567890;

    jest.spyOn(Date, 'now').mockReturnValue(mockDate);

    act(() => {
      result.current.openAlert({ message: '테스트 알림' });
    });

    expect(mockAlertSubject.addAlert).toHaveBeenCalledWith({
      id: mockDate,
      message: '테스트 알림',
      handleClick: undefined,
    });

    jest.restoreAllMocks();
  });
});
