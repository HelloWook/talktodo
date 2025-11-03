import { DndContext } from '@dnd-kit/core';
import { render, screen } from '@testing-library/react';

import DraggableWrapper from './DraggableWrapper';

describe('DraggableWrapper', () => {
  const mockChild = <div data-testid='test-child'>Test Content</div>;

  it('드래그가 활성화되어 있을 때 자식 요소를 렌더링한다', () => {
    render(
      <DndContext>
        <DraggableWrapper id='test-1' isDragEnabled={true}>
          {mockChild}
        </DraggableWrapper>
      </DndContext>,
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('드래그가 비활성화되어 있을 때도 자식 요소를 렌더링한다', () => {
    render(
      <DndContext>
        <DraggableWrapper id='test-2' isDragEnabled={false}>
          {mockChild}
        </DraggableWrapper>
      </DndContext>,
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('isDragEnabled prop이 없을 때 기본값 true로 동작한다', () => {
    render(
      <DndContext>
        <DraggableWrapper id='test-3'>{mockChild}</DraggableWrapper>
      </DndContext>,
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });
});
