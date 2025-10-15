type Listener = () => void;

type Toast = {
  id: string;
  content: string;
  handleClick: () => void;
};

export class ToastStore {
  private listeners = new Set<Listener>();
  private static instance: ToastStore;
  private toasts: Toast[] = [];

  public static getInstance() {
    if (!ToastStore.instance) {
      ToastStore.instance = new ToastStore();
    }
    return ToastStore.instance;
  }

  get() {
    return this.toasts;
  }

  set(toasts: Toast[]) {
    this.toasts = toasts;
    this.notify();
  }

  addToast(toast: Toast) {
    this.toasts.push(toast);
    this.notify();
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }
}

export const toastStore = ToastStore.getInstance();
