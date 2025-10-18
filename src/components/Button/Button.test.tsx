import { fireEvent, render, screen } from '@testing-library/react';

import Button from './Button';

describe('Button', () => {
  it('버튼이 렌더링 된다.', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('버튼이 클릭되면 클릭 이벤트가 호출된다.', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });
});
