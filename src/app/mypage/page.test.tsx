import { render, screen } from '@testing-library/react';

import MyPage from './page';

// Next.js Image 컴포넌트 모킹
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
    return <img src={src} alt={alt} {...props} />;
  };
});

describe('MyPage', () => {
  it('마이페이지가 렌더링된다.', () => {
    render(<MyPage />);
    expect(screen.getByText('마이 페이지')).toBeInTheDocument();
  });

  it('프로필 이미지가 렌더링된다.', () => {
    render(<MyPage />);
    const profileImage = screen.getByAltText('profile');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src', '/img/profile.png');
  });

  it('이름 필드가 렌더링된다.', () => {
    render(<MyPage />);
    expect(screen.getByText('이름')).toBeInTheDocument();
  });

  it('이메일 필드가 렌더링된다.', () => {
    render(<MyPage />);
    expect(screen.getByText('이메일')).toBeInTheDocument();
  });

  it('로그인 버튼이 렌더링된다.', () => {
    render(<MyPage />);
    expect(screen.getByText('로그인')).toBeInTheDocument();
  });

  it('폼이 올바른 클래스명을 가진다.', () => {
    render(<MyPage />);
    const form = document.querySelector('form');
    expect(form).toHaveClass('h-[613px]', 'w-[90%]', 'max-w-[640px]', 'rounded-[28px]', 'bg-[var(--color-white)]');
  });
});
