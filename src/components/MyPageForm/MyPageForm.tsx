'use client';
import React, { useRef } from 'react';

import UserForm from '../UserForm/UserForm';

const MyPageForm = () => {
  const imageRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <UserForm>
        <UserForm.Title title='마이 페이지' />
        <UserForm.UserProfileUpload imageRef={imageRef} />
        <UserForm.FieldGroup fieldName='이름' />
        <UserForm.FieldGroup fieldName='이메일' />
        <UserForm.FormButton className='w-full'>로그인</UserForm.FormButton>
      </UserForm>
    </>
  );
};

export default MyPageForm;
