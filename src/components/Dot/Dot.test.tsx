import { render, screen } from '@testing-library/react';

import Dot from './Dot';

describe('Dot', () => {
  it('낮음 우선순위에 따른 색상이 렌더링 된다.', () => {
    render(<Dot priority='낮음' />);
    const dot = screen.getByRole('status');
    expect(dot).toHaveClass('bg-green-500');
  });
});
