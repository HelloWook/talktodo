import { ReactNode } from 'react';

export type DialogType = {
  id: string;
  content: ReactNode;
  onClose?: () => void;
};
