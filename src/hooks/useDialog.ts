import { useCallback, useEffect, useState } from 'react';

import { DialogType } from '@/components/DialogManager/Dialog.type';
import { dialogService } from '@/components/DialogManager/dialogService';

/**
 * Dialog를 호출하는 훅입니다.
 * 사용 예시:
 * const { dialogs, openDialog, closeDialog } = useDialog();
 * openDialog(<MyComponent />);
 * closeDialog(dialogId);
 */

export const useDialog = () => {
  const [dialogs, setDialogs] = useState<DialogType[]>([]);

  const handleDialogsChange = useCallback((newDialogs: DialogType[]) => {
    setDialogs(newDialogs);
  }, []);

  useEffect(() => {
    setDialogs(dialogService.getDialogs());
    const unsubscribe = dialogService.subscribe(handleDialogsChange);
    return () => {
      unsubscribe();
    };
  }, [handleDialogsChange]);

  const openDialog = useCallback((content: React.ReactNode, onClose?: () => void) => {
    return dialogService.openDialog(content, onClose);
  }, []);

  const closeDialog = useCallback((id: string) => {
    dialogService.closeDialog(id);
  }, []);

  const closeAllDialogs = useCallback(() => {
    dialogService.closeAllDialogs();
  }, []);

  return {
    dialogs,
    openDialog,
    closeDialog,
    closeAllDialogs,
  };
};

export default useDialog;
