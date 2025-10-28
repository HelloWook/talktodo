import { fireEvent, render, screen } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  it('인풋이 렌더링 된다.', () => {
    render(<Input placeholder='입력하세요' />);
    expect(screen.getByPlaceholderText('입력하세요')).toBeInTheDocument();
  });

  it('인풋에 텍스트를 입력할 수 있다.', () => {
    render(<Input placeholder='입력하세요' />);
    const input = screen.getByPlaceholderText('입력하세요');
    fireEvent.change(input, { target: { value: '테스트 텍스트' } });
    expect(input).toHaveValue('테스트 텍스트');
  });

  it('disabled 상태일 때 입력할 수 없다.', () => {
    render(<Input placeholder='입력하세요' disabled />);
    const input = screen.getByPlaceholderText('입력하세요');
    expect(input).toBeDisabled();
  });
});
