'use client';

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { createPortal } from 'react-dom';

import { useDialog } from '@/hooks/useDialog';
import useMount from '@/hooks/useMount';

import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTitle } from '../ui/dialog';

const DialogContainer = () => {
  const isMounted = useMount();
  const { dialogs, closeDialog } = useDialog();

  if (!isMounted) return null;

  return createPortal(
    <>
      {dialogs.map((dialog) => (
        <Dialog key={dialog.id} open={true} onOpenChange={(open) => !open && closeDialog(dialog.id)}>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent
              className='max-w-[520px] border-0 bg-transparent p-0 shadow-none'
              showCloseButton={false}
              onInteractOutside={(e) => {
                e.preventDefault();
                closeDialog(dialog.id);
              }}
              onEscapeKeyDown={() => closeDialog(dialog.id)}
            >
              <VisuallyHidden.Root>
                <DialogTitle>Dialog</DialogTitle>
              </VisuallyHidden.Root>
              {dialog.content}
            </DialogContent>
          </DialogPortal>
        </Dialog>
      ))}
    </>,
    document.getElementById('dialog-root') as HTMLElement,
  );
};

export default DialogContainer;
