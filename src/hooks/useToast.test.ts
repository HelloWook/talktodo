import { act, renderHook } from '@testing-library/react';

import { ToastType } from '@/components/Toast/Toast.type';
import { toastService } from '@/components/Toast/toastService';

import { useToast } from './useToast';

// toastService 모킹
jest.mock('@/components/Toast/toastService', () => ({
  toastService: {
    getToasts: jest.fn(),
    subscribe: jest.fn(),
    addToast: jest.fn(),
    removeToast: jest.fn(),
  },
}));

const mockToastService = toastService as jest.Mocked<typeof toastService>;

describe('useToast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockToastService.getToasts.mockReturnValue([]);
  });

  it('초기 상태에서 빈 토스트 배열을 반환한다', () => {
    const mockUnsubscribe = jest.fn();
    mockToastService.subscribe.mockReturnValue(mockUnsubscribe);

    const { result } = renderHook(() => useToast());

    expect(result.current.toasts).toEqual([]);
    expect(mockToastService.getToasts).toHaveBeenCalled();
  });

  it('토스트 서비스에 구독한다', () => {
    const mockUnsubscribe = jest.fn();
    mockToastService.subscribe.mockReturnValue(mockUnsubscribe);

    const { unmount } = renderHook(() => useToast());

    expect(mockToastService.subscribe).toHaveBeenCalledWith(expect.any(Function));

    unmount();
    expect(mockUnsubscribe).toHaveBeenCalled();
  });

  it('토스트 상태 변경 시 업데이트된다', () => {
    const mockToasts = [
      { id: '1', content: 'test1' },
      { id: '2', content: 'test2' },
    ];

    let listener: (toasts: ToastType[]) => void;
    const mockUnsubscribe = jest.fn();
    mockToastService.subscribe.mockImplementation((callback) => {
      listener = callback;
      return mockUnsubscribe;
    });

    const { result } = renderHook(() => useToast());

    // 초기 상태
    expect(result.current.toasts).toEqual([]);

    // 토스트 상태 변경 시뮬레이션
    act(() => {
      listener!(mockToasts);
    });

    expect(result.current.toasts).toEqual(mockToasts);
  });

  it('addToast 함수를 제공한다', () => {
    const mockUnsubscribe = jest.fn();
    mockToastService.subscribe.mockReturnValue(mockUnsubscribe);

    const { result } = renderHook(() => useToast());

    result.current.addToast('test message');

    expect(mockToastService.addToast).toHaveBeenCalledWith('test message');
  });

  it('removeToast 함수를 제공한다', () => {
    const mockUnsubscribe = jest.fn();
    mockToastService.subscribe.mockReturnValue(mockUnsubscribe);

    const { result } = renderHook(() => useToast());

    result.current.removeToast('test-id');

    expect(mockToastService.removeToast).toHaveBeenCalledWith('test-id');
  });
});
