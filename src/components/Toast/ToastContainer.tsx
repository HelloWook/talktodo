'use client';

import { createPortal } from 'react-dom';

import useMount from '@/hooks/useMount';
import { useToast } from '@/hooks/useToast';

import Toast from './Toast';

const ToastContainer = () => {
  const isMounted = useMount();
  const { toasts } = useToast();

  if (!isMounted) return null;

  return createPortal(
    <div className='fixed top-4 left-1/2 z-50 flex -translate-x-1/2 transform flex-col items-center gap-2 space-y-2'>
      {toasts
        .slice()
        .reverse()
        .map((toast) => (
          <Toast key={toast.id} id={toast.id} content={toast.content} />
        ))}
    </div>,
    document.getElementById('toast-container') as HTMLElement,
  );
};

export default ToastContainer;
