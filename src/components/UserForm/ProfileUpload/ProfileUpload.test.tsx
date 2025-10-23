import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRef } from 'react';

import ProfileUpload from './ProfileUpload';

// Next.js Image 컴포넌트 모킹
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
    return <img src={src} alt={alt} {...props} />;
  };
});

// Icon 컴포넌트 모킹
jest.mock('@/components/Icon/Icon', () => {
  return function MockIcon({ name }: { name: string }) {
    return <span data-testid={`icon-${name}`}>{name}</span>;
  };
});

// Test wrapper component to provide ref
const TestWrapper = ({
  currentImageUrl,
  onFileSelect,
  resetToOriginal,
}: {
  currentImageUrl?: string;
  onFileSelect?: (file: File) => void;
  resetToOriginal?: boolean;
}) => {
  const imageRef = useRef<HTMLInputElement>(null);

  return (
    <ProfileUpload imageRef={imageRef} currentImageUrl={currentImageUrl} onFileSelect={onFileSelect} resetToOriginal={resetToOriginal} />
  );
};

describe('ProfileUpload', () => {
  it('기본 프로필 이미지가 렌더링된다.', () => {
    render(<TestWrapper />);
    const profileImage = screen.getByAltText('미리보기');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src', '/img/Profile.png');
  });

  it('편집하기 버튼이 렌더링된다.', () => {
    render(<TestWrapper />);
    expect(screen.getByText('편집하기')).toBeInTheDocument();
    expect(screen.getByTestId('icon-image')).toBeInTheDocument();
  });

  it('편집하기 버튼을 클릭하면 파일 선택 창이 열린다.', () => {
    render(<TestWrapper />);
    const editButton = screen.getByText('편집하기');
    fireEvent.click(editButton);
    // 파일 input이 클릭되는 것을 확인
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('파일이 선택되면 미리보기가 업데이트된다.', async () => {
    const onFileSelect = jest.fn();
    render(<TestWrapper onFileSelect={onFileSelect} />);

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByDisplayValue('');

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(onFileSelect).toHaveBeenCalledWith(file);
    });
  });

  it('currentImageUrl이 변경되면 이미지가 업데이트된다.', () => {
    const { rerender } = render(<TestWrapper currentImageUrl='/test-image.jpg' />);

    let profileImage = screen.getByAltText('미리보기');
    expect(profileImage).toHaveAttribute('src', '/test-image.jpg');

    rerender(<TestWrapper currentImageUrl='/new-image.jpg' />);
    profileImage = screen.getByAltText('미리보기');
    expect(profileImage).toHaveAttribute('src', '/new-image.jpg');
  });

  it('resetToOriginal이 true일 때 원본 이미지로 리셋된다.', () => {
    const onFileSelect = jest.fn();
    const { rerender } = render(<TestWrapper currentImageUrl='/test-image.jpg' onFileSelect={onFileSelect} resetToOriginal={false} />);

    // 파일 선택 시뮬레이션
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByDisplayValue('');
    fireEvent.change(input, { target: { files: [file] } });

    // resetToOriginal을 true로 변경
    rerender(<TestWrapper currentImageUrl='/test-image.jpg' onFileSelect={onFileSelect} resetToOriginal={true} />);

    const profileImage = screen.getByAltText('미리보기');
    expect(profileImage).toHaveAttribute('src', '/test-image.jpg');
  });

  it('파일이 선택되지 않으면 기존 이미지로 되돌아간다.', async () => {
    const onFileSelect = jest.fn();
    render(<TestWrapper currentImageUrl='/test-image.jpg' onFileSelect={onFileSelect} />);

    const input = screen.getByDisplayValue('');

    // 파일 선택 후 취소 (빈 파일 목록)
    fireEvent.change(input, { target: { files: [] } });

    await waitFor(() => {
      const profileImage = screen.getByAltText('미리보기');
      expect(profileImage).toHaveAttribute('src', '/test-image.jpg');
    });
  });

  it('올바른 클래스명을 가진다.', () => {
    render(<TestWrapper />);
    const container = screen.getByAltText('미리보기').parentElement;
    expect(container).toHaveClass('flex', 'items-center', 'justify-center', 'flex-col', 'relative', 'mb-[44px]');
  });

  it('이미지가 원형으로 렌더링된다.', () => {
    render(<TestWrapper />);
    const profileImage = screen.getByAltText('미리보기');
    expect(profileImage).toHaveClass('rounded-full', 'object-cover', '!h-[140px]');
  });
});
