import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Toggle from './Toggle';

describe('Toggle', () => {
  it('토글이 렌더링된다.', () => {
    render(<Toggle />);

    const toggle = screen.getByRole('switch');
    expect(toggle).toBeInTheDocument();
  });

  it('클릭 시 상태가 변경된다.', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<Toggle onChange={onChange} />);

    const toggle = screen.getByRole('switch');
    await user.click(toggle);

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('onChecked와 onUnchecked 콜백이 올바르게 호출된다.', async () => {
    const user = userEvent.setup();
    const onChecked = jest.fn();
    const onUnchecked = jest.fn();

    render(<Toggle onChecked={onChecked} onUnchecked={onUnchecked} />);

    const toggle = screen.getByRole('switch');

    // 첫 번째 클릭 - checked (right)
    await user.click(toggle);
    expect(onChecked).toHaveBeenCalledTimes(1);
    expect(onUnchecked).not.toHaveBeenCalled();

    // 두 번째 클릭 - unchecked (left)
    await user.click(toggle);
    expect(onChecked).toHaveBeenCalledTimes(1);
    expect(onUnchecked).toHaveBeenCalledTimes(1);
  });

  it('왼쪽/오른쪽 아이콘이 렌더링된다.', () => {
    render(
      <Toggle
        icons={{
          left: <span data-testid='left-icon'>Left</span>,
          right: <span data-testid='right-icon'>Right</span>,
        }}
      />,
    );

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('variant prop이 올바르게 적용된다.', () => {
    const { rerender } = render(<Toggle variant='primary' />);
    let toggle = screen.getByRole('switch');
    expect(toggle).toHaveClass('bg-primary');

    rerender(<Toggle variant='secondary' />);
    toggle = screen.getByRole('switch');
    expect(toggle).toHaveClass('bg-purple-200');
  });
});
