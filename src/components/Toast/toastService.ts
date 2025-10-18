import { ToastType } from '@/components/Toast/Toast.type';

class ToastService {
  private toasts: ToastType[] = [];
  private listeners = new Set<(toasts: ToastType[]) => void>();
  private readonly maxCount = 3;
  private readonly duration = 3000;

  addToast(content: string) {
    const toast: ToastType = {
      id: Date.now().toString(),
      content,
    };

    this.toasts = [...this.toasts, toast];

    // 최대 개수 제한
    if (this.toasts.length > this.maxCount) {
      this.toasts = this.toasts.slice(-this.maxCount);
    }

    this.notifyListeners();

    // 자동 제거
    setTimeout(() => {
      this.removeToast(toast.id);
    }, this.duration);
  }

  removeToast(id: string) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.notifyListeners();
  }

  subscribe(listener: (toasts: ToastType[]) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getToasts(): ToastType[] {
    return [...this.toasts];
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }

  reset() {
    this.toasts = [];
    this.listeners.clear();
  }
}

export const toastService = new ToastService();
