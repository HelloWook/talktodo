import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { ReactNode } from 'react';

interface DraggableWrapperProps {
  id: string;
  children: ReactNode;
  isDragEnabled?: boolean;
}

export default function DraggableWrapper({ id, children, isDragEnabled = true }: DraggableWrapperProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled: !isDragEnabled,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  if (!isDragEnabled) {
    return <div>{children}</div>;
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
