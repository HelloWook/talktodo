import { useCallback, useEffect, useState } from 'react';

import { memoDrawerService } from '@/components/MemoDrawer/memoDrawerService';
import { Task } from '@/types';

interface MemoDrawerState {
  isOpen: boolean;
  task: Task | null;
  onSaveMemo: ((taskId: string, memo: string) => void) | null;
}

/**
 * MemoDrawer를 호출하는 훅입니다.
 * 사용 예시:
 * const { openMemoDrawer, closeMemoDrawer } = useMemoDrawer();
 * openMemoDrawer(task, (taskId, memo) => { ... });
 */
export const useMemoDrawer = () => {
  const [state, setState] = useState<MemoDrawerState>({
    isOpen: false,
    task: null,
    onSaveMemo: null,
  });

  const handleStateChange = useCallback((newState: MemoDrawerState) => {
    setState(newState);
  }, []);

  useEffect(() => {
    setState(memoDrawerService.getState());
    const unsubscribe = memoDrawerService.subscribe(handleStateChange);
    return () => {
      unsubscribe();
    };
  }, [handleStateChange]);

  const openMemoDrawer = useCallback((task: Task, onSaveMemo: (taskId: string, memo: string) => void) => {
    memoDrawerService.openMemoDrawer(task, onSaveMemo);
  }, []);

  const closeMemoDrawer = useCallback(() => {
    memoDrawerService.closeMemoDrawer();
  }, []);

  return {
    isOpen: state.isOpen,
    task: state.task,
    onSaveMemo: state.onSaveMemo,
    openMemoDrawer,
    closeMemoDrawer,
  };
};

export default useMemoDrawer;
