import { fireEvent, render, screen } from '@testing-library/react';

import Alert from './Alert';

describe('Alert', () => {
  it('Alert이 렌더링된다.', () => {
    render(<Alert message='테스트 메시지' />);
    expect(screen.getByText('테스트 메시지')).toBeInTheDocument();
  });

  it('handleClick이 없을 때 버튼이 렌더링되지 않는다.', () => {
    render(<Alert message='테스트 메시지' />);
    expect(screen.queryByText('변경사항 저장하기')).not.toBeInTheDocument();
  });

  it('handleClick이 있을 때 버튼이 렌더링된다.', () => {
    const mockHandleClick = jest.fn();
    render(<Alert message='테스트 메시지' handleClick={mockHandleClick} />);
    expect(screen.getByText('변경사항 저장하기')).toBeInTheDocument();
  });

  it('버튼 클릭 시 handleClick이 호출된다.', () => {
    const mockHandleClick = jest.fn();
    render(<Alert message='테스트 메시지' handleClick={mockHandleClick} />);

    const button = screen.getByText('변경사항 저장하기');
    fireEvent.click(button);

    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });
});
