import { useCallback, useEffect, useState } from 'react';

import { ToastType } from '@/components/Toast/Toast.type';
import { toastService } from '@/components/Toast/toastService';

/**
 * 토스트를 호출 하는 훅입니다.
 * 사용 예시:
 * const { toasts, addToast, removeToast } = useToast();
 * addToast('테스트 토스트');
 * removeToast('테스트 토스트');
 */

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const handleToastsChange = useCallback((newToasts: ToastType[]) => {
    setToasts(newToasts);
  }, []);

  useEffect(() => {
    setToasts(toastService.getToasts());
    const unsubscribe = toastService.subscribe(handleToastsChange);
    return () => {
      unsubscribe();
    };
  }, [handleToastsChange]);

  return {
    toasts,
    addToast: toastService.addToast,
    removeToast: toastService.removeToast,
  };
};

export default useToast;
