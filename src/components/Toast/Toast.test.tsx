import { render, screen } from '@testing-library/react';

import Toast from './Toast';

describe('Toast', () => {
  it('토스트가 렌더링 된다', () => {
    render(<Toast id='1' content='test' />);

    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
