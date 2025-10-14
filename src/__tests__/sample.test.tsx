import { render, screen } from '@testing-library/react';
import React from 'react';

function Hello() {
  return <div>Hello Jest</div>;
}

describe('sample', () => {
  it('renders component text', () => {
    render(<Hello />);
    expect(screen.getByText('Hello Jest')).toBeInTheDocument();
  });
});
