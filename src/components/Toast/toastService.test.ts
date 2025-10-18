import { act } from 'react';

import { toastService } from './toastService';

describe('ToastService', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    toastService.reset();
    jest.clearAllMocks();
  });

  it('토스트를 추가하고 자동으로 제거한다', () => {
    const listener = jest.fn();

    toastService.subscribe(listener);
    toastService.addToast('test');

    expect(listener).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ content: 'test' })]));
    expect(toastService.getToasts()).toHaveLength(1);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(toastService.getToasts()).toHaveLength(0);
  });

  it('최대 개수 제한이 작동한다', () => {
    const listener = jest.fn();

    toastService.subscribe(listener);

    toastService.addToast('test1');
    toastService.addToast('test2');
    toastService.addToast('test3');
    toastService.addToast('test4');

    expect(toastService.getToasts()).toHaveLength(3);
    expect(toastService.getToasts()[0].content).toBe('test2');
    expect(toastService.getToasts()[1].content).toBe('test3');
    expect(toastService.getToasts()[2].content).toBe('test4');
  });

  it('구독 해제가 작동한다', () => {
    const listener = jest.fn();

    const unsubscribe = toastService.subscribe(listener);
    unsubscribe();

    toastService.addToast('test');

    expect(listener).not.toHaveBeenCalled();
  });

  it('토스트를 수동으로 제거할 수 있다', () => {
    const listener = jest.fn();

    toastService.subscribe(listener);
    toastService.addToast('test');

    const currentToasts = toastService.getToasts();
    expect(currentToasts).toHaveLength(1);

    toastService.removeToast(currentToasts[0].id);
    expect(toastService.getToasts()).toHaveLength(0);
  });
});
