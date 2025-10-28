import { render, screen, cleanup } from '@testing-library/react';

import ActiveIcon from './ActiveIcon';

describe('ActiveIcon', () => {
  afterEach(() => {
    cleanup();
  });

  it('활성 상태일 때 올바른 색상이 렌더링 된다.', () => {
    render(<ActiveIcon active={true} />);

    const activeIcon = screen.getByRole('status');

    expect(activeIcon).toHaveClass('fill-purple-200 text-purple-500');
  });

  it('비활성 상태일 때 올바른 색상이 렌더링 된다.', () => {
    render(<ActiveIcon active={false} />);

    const inactiveIcon = screen.getByRole('status');
    expect(inactiveIcon).toHaveClass('fill-white text-purple-500');
  });
});
