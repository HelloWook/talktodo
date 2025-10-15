'use client';
import { useEffect, useSyncExternalStore } from 'react';

import { toastStore } from './toastStore';

type Toast = {
  id: string;
  content: string;
  handleClick: () => void;
};

const useToastHook = () => {
  return useSyncExternalStore(
    () => toastStore.subscribe(() => {}),
    () => toastStore.get(),
    () => toastStore.get(),
  );
};

const Toast = ({ toast }: { toast: Toast }) => {
  return <div>{toast.content}</div>;
};

const MAX_TOASTS = 3;
const MAX_TOAST_DURATION = 3000;

const ToastContainer = () => {
  const toasts = useToastHook();

  useEffect(() => {
    setTimeout(() => {
      toastStore.set(toasts.slice(1));
    }, MAX_TOAST_DURATION);
  });

  return (
    <div>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
