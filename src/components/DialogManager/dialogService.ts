import { ReactNode } from 'react';

import { DialogType } from './Dialog.type';

class DialogService {
  private dialogs: DialogType[] = [];
  private listeners = new Set<(dialogs: DialogType[]) => void>();

  openDialog(content: ReactNode, onClose?: () => void): string {
    const dialog: DialogType = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      content,
      onClose,
    };

    this.dialogs = [...this.dialogs, dialog];
    this.notifyListeners();

    return dialog.id;
  }

  closeDialog(id: string) {
    const dialog = this.dialogs.find((d) => d.id === id);
    if (dialog?.onClose) {
      dialog.onClose();
    }

    this.dialogs = this.dialogs.filter((d) => d.id !== id);
    this.notifyListeners();
  }

  closeAllDialogs() {
    this.dialogs.forEach((dialog) => {
      if (dialog.onClose) {
        dialog.onClose();
      }
    });
    this.dialogs = [];
    this.notifyListeners();
  }

  subscribe(listener: (dialogs: DialogType[]) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getDialogs(): DialogType[] {
    return [...this.dialogs];
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener([...this.dialogs]));
  }

  reset() {
    this.dialogs = [];
    this.listeners.clear();
  }
}

export const dialogService = new DialogService();

// 전역에서 사용할 수 있는 편의 함수
export const openDialog = (content: ReactNode, onClose?: () => void) => {
  return dialogService.openDialog(content, onClose);
};

export const closeDialog = (id: string) => {
  dialogService.closeDialog(id);
};

export const closeAllDialogs = () => {
  dialogService.closeAllDialogs();
};
