import { useCallback } from 'react';

import { toastService } from '@/components/Toast/toastService';
import { ApiError } from '@/error/error';

export function useErrorHandler() {
  const handleError = useCallback((error: unknown, defaultMessage: string = '오류가 발생했습니다.') => {
    if (error instanceof ApiError) {
      if (error.code === 'ERR_40100') {
        window.location.href = '/login' + '?message=' + error.message;
        return;
      }

      toastService.addToast(error.message);
      return;
    }

    toastService.addToast(defaultMessage);
  }, []);

  return { handleError };
}
