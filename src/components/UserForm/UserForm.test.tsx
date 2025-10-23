import { fireEvent, render, screen } from '@testing-library/react';

import UserForm from './UserForm';

// Next.js Image 컴포넌트 모킹
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
    return <img src={src} alt={alt} {...props} />;
  };
});

describe('UserForm', () => {
  it('UserForm이 렌더링된다.', () => {
    render(
      <UserForm>
        <div>Test content</div>
      </UserForm>,
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});

describe('UserForm.Title', () => {
  it('제목이 렌더링된다.', () => {
    render(<UserForm.Title title='테스트 제목' />);
    expect(screen.getByText('테스트 제목')).toBeInTheDocument();
  });

  it('올바른 태그로 렌더링된다.', () => {
    render(<UserForm.Title title='테스트 제목' />);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
  });
});

describe('UserForm.FieldGroup', () => {
  it('필드 그룹이 렌더링된다.', () => {
    render(<UserForm.FieldGroup fieldName='테스트 필드' />);
    expect(screen.getByText('테스트 필드')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('children이 렌더링된다.', () => {
    render(
      <UserForm.FieldGroup fieldName='테스트 필드'>
        <div>Custom content</div>
      </UserForm.FieldGroup>,
    );
    expect(screen.getByText('Custom content')).toBeInTheDocument();
  });

  it('input props를 전달받는다.', () => {
    render(<UserForm.FieldGroup fieldName='테스트 필드' placeholder='입력하세요' />);
    const input = screen.getByPlaceholderText('입력하세요');
    expect(input).toBeInTheDocument();
  });
});

describe('UserForm.FormButton', () => {
  it('버튼이 렌더링된다.', () => {
    render(<UserForm.FormButton>테스트 버튼</UserForm.FormButton>);
    expect(screen.getByText('테스트 버튼')).toBeInTheDocument();
  });

  it('클릭 이벤트가 호출된다.', () => {
    const onClick = jest.fn();
    render(<UserForm.FormButton onClick={onClick}>테스트 버튼</UserForm.FormButton>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it('submit 타입을 가진다.', () => {
    render(<UserForm.FormButton>테스트 버튼</UserForm.FormButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });
});

describe('UserForm.ProfileUpload', () => {
  it('프로필 이미지가 렌더링된다.', () => {
    render(<UserForm.ProfileUpload />);
    const profileImage = screen.getByAltText('profile');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src', '/img/profile.png');
  });
});
