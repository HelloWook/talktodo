'use client';

import { createPortal } from 'react-dom';

import { useMemoDrawer } from '@/hooks/useMemoDrawer';
import useMount from '@/hooks/useMount';

import MemoDrawer from './MemoDrawer';

const MemoDrawerContainer = () => {
  const isMounted = useMount();
  const { isOpen, task, onSaveMemo, closeMemoDrawer } = useMemoDrawer();

  if (!isMounted) return null;

  const handleClose = () => {
    closeMemoDrawer();
  };

  const handleSaveMemo = (taskId: string, memo: string) => {
    if (onSaveMemo) {
      onSaveMemo(taskId, memo);
    }
  };

  return createPortal(
    <MemoDrawer isOpen={isOpen} onClose={handleClose} task={task} onSaveMemo={handleSaveMemo} />,
    document.getElementById('memo-drawer-root') as HTMLElement,
  );
};

export default MemoDrawerContainer;
