'use client';

import { useEffect } from 'react';

import { useAlert } from '@/hooks/useAlert';

export default function ServiceWorkerRegistration() {
  const { openAlert } = useAlert();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    openAlert({ message: '새 버전의 앱이 사용 가능합니다.' });
                  }
                });
              }
            });
          })
          .catch((error) => {
            console.error('Service Worker 등록 실패:', error);
          });
      });
    }
  }, []);

  return null;
}
