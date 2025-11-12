import { Task } from '@/types';

interface MemoDrawerState {
  isOpen: boolean;
  task: Task | null;
  onSaveMemo: ((taskId: string, memo: string) => void) | null;
}

class MemoDrawerService {
  private state: MemoDrawerState = {
    isOpen: false,
    task: null,
    onSaveMemo: null,
  };
  private listeners = new Set<(state: MemoDrawerState) => void>();

  openMemoDrawer(task: Task, onSaveMemo: (taskId: string, memo: string) => void) {
    this.state = {
      isOpen: true,
      task,
      onSaveMemo,
    };
    this.notifyListeners();
  }

  closeMemoDrawer() {
    this.state = {
      isOpen: false,
      task: null,
      onSaveMemo: null,
    };
    this.notifyListeners();
  }

  subscribe(listener: (state: MemoDrawerState) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getState(): MemoDrawerState {
    return { ...this.state };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener({ ...this.state }));
  }

  reset() {
    this.state = {
      isOpen: false,
      task: null,
      onSaveMemo: null,
    };
    this.listeners.clear();
  }
}

export const memoDrawerService = new MemoDrawerService();

// 전역에서 사용할 수 있는 편의 함수
export const openMemoDrawer = (task: Task, onSaveMemo: (taskId: string, memo: string) => void) => {
  memoDrawerService.openMemoDrawer(task, onSaveMemo);
};

export const closeMemoDrawer = () => {
  memoDrawerService.closeMemoDrawer();
};
