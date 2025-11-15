import { render, screen } from '@testing-library/react';

import Icon from './Icon';

describe('Icon', () => {
  it('아이콘이 렌더링 된다.', () => {
    render(<Icon name='home' />);

    const icon = screen.getByLabelText('home');
    expect(icon).toBeInTheDocument();
  });

  it('올바른 아이콘 이름으로 use 요소가 생성된다.', () => {
    render(<Icon name='home' />);

    const useElement = screen.getByLabelText('home').querySelector('use');
    expect(useElement).toHaveAttribute('href', '#home');
  });

  it('SVG 요소가 올바르게 렌더링된다.', () => {
    render(<Icon name='home' />);

    const svg = screen.getByLabelText('home');
    expect(svg.tagName).toBe('svg');
    expect(svg).toHaveAttribute('aria-label', 'home');
  });

  it('use 요소가 올바르게 렌더링된다.', () => {
    render(<Icon name='home' />);

    const useElement = screen.getByLabelText('home').querySelector('use');
    expect(useElement).toBeInTheDocument();
    expect(useElement).toHaveAttribute('href', '#home');
  });
});
