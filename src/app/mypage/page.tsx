'use client';
import UserForm from '@/components/UserForm/UserForm';

const MyPage = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <UserForm>
        <UserForm.Title title='마이 페이지' />
        <UserForm.ProfileUpload />
        <UserForm.FieldGroup fieldName='이름' />
        <UserForm.FieldGroup fieldName='이메일' />
        <UserForm.FormButton className='w-full'>로그인</UserForm.FormButton>
      </UserForm>
    </div>
  );
};

export default MyPage;
