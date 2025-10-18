import { useCallback, useEffect, useState } from 'react';

import { ToastType } from '@/components/Toast/Toast.type';
import { toastService } from '@/components/Toast/toastService';

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
