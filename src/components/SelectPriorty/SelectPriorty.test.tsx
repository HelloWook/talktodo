import { render, screen, fireEvent } from '@testing-library/react';

import SelectPriorty from './SelectPriorty';

describe('SelectPriorty', () => {
  it('우선 순위 선택 드롭다운이 렌더링 된다.', () => {
    render(<SelectPriorty onChange={() => {}} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('우선 순위를 선택할 수 있다.', () => {
    render(<SelectPriorty onChange={() => {}} />);

    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);

    expect(screen.getByText('중요')).toBeInTheDocument();
    expect(screen.getByText('보통')).toBeInTheDocument();
    expect(screen.getByText('낮음')).toBeInTheDocument();
  });
});
