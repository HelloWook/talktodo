'use client';

import { useEffect, useRef } from 'react';

import { useAlert } from '@/hooks/useAlert';

export default function NetworkStatusMonitor() {
  const { openAlert, closeAlert } = useAlert();
  const previousStatusRef = useRef<boolean | null>(null);

  useEffect(() => {
    const isOnline = navigator.onLine;
    previousStatusRef.current = isOnline;

    const handleOnline = () => {
      if (previousStatusRef.current === false) {
        openAlert({
          message: '인터넷 연결이 복구되었습니다.',
        });
      }
      previousStatusRef.current = true;
    };

    const handleOffline = () => {
      if (previousStatusRef.current === true || previousStatusRef.current === null) {
        openAlert({
          message: '인터넷 연결이 끊어졌습니다. 네트워크를 확인해주세요.',
        });
      }
      previousStatusRef.current = false;
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [openAlert, closeAlert]);

  return null;
}
