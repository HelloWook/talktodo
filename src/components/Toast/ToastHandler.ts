'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import useToast from '@/hooks/useToast';

export default function ToastHandler() {
  const searchParams = useSearchParams();
  const { addToast } = useToast();

  useEffect(() => {
    const message = searchParams.get('message');
    console.log('ad');
    if (message) {
      addToast(decodeURIComponent(message));

      const url = new URL(window.location.href);
      url.searchParams.delete('message');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams]);

  return null;
}
