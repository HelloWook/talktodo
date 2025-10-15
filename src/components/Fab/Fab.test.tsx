import { PortalProps } from '@radix-ui/react-portal';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { forwardRef } from 'react';

import Fab from './Fab';

jest.mock('@radix-ui/react-portal', () => ({
  ...jest.requireActual('@radix-ui/react-portal'),
  Portal: forwardRef<HTMLDivElement, PortalProps>(function PortalMock(props, ref) {
    return <>{props.children}</>;
  }),
}));

describe('Fab', () => {
  let user: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    user = userEvent.setup();
  });

  it('Fab이 렌더링된다.', () => {
    render(<Fab items={['item1', 'item2', 'item3']} size='small' />);
    const buttonElement = screen.getByLabelText('Open Menu');
    expect(buttonElement).toBeInTheDocument();
  });

  it('Fab 버튼이 올바른 속성을 가진다.', () => {
    render(<Fab items={['item1', 'item2', 'item3']} size='small' />);
    const buttonElement = screen.getByLabelText('Open Menu');

    expect(buttonElement).toHaveAttribute('aria-label', 'Open Menu');
    expect(buttonElement).toHaveAttribute('aria-haspopup', 'menu');
    expect(buttonElement).toHaveAttribute('data-state', 'closed');
  });

  it('Fab 버튼이 클릭되면 드롭다운이 열린다. (userEvent)', async () => {
    render(<Fab items={['item1', 'item2', 'item3']} size='small' />);

    const buttonElement = screen.getByLabelText('Open Menu');

    await user.click(buttonElement);

    const item1 = screen.getByRole('menuitem', { name: 'item1' });

    expect(item1).toBeInTheDocument();

    expect(buttonElement).toHaveAttribute('data-state', 'open');
  });

  it('올바른 크기 클래스가 적용된다.', () => {
    render(<Fab items={['item1', 'item2', 'item3']} size='small' />);
    const buttonElement = screen.getByLabelText('Open Menu');

    expect(buttonElement).toHaveClass('h-[64px]', 'w-[64px]');
  });
});
