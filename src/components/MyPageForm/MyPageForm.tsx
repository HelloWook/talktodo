'use client';
import React, { useState, useEffect } from 'react';

import Button from '@/components/Button/Button';
import Typography from '@/components/Typography/Typography';
import { useDialog } from '@/hooks/useDialog';
import { useUpdateUser, useDeleteAccount } from '@/quries/useUser';
import { useUserStore } from '@/stores/user';
import { formatEmail } from '@/utils/formatEmail';

import UserForm from '../UserForm/UserForm';

const MyPageForm = () => {
  const { openDialog, closeDialog } = useDialog();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const { deleteAccount, isDeleting } = useDeleteAccount();
  const user = useUserStore((state) => state.user);

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || '');
      setEmail(formatEmail(user.email) || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: { nickname: string } = {
      nickname: nickname.trim(),
    };

    updateUser(payload);
  };

  const handleDeleteAccount = () => {
    const dialogId = openDialog(
      <div className='flex flex-col gap-4 rounded-[28px] bg-white p-8 shadow-lg'>
        <Typography variant='title2-semibold' as='h2' className='text-gray-900'>
          계정 탈퇴
        </Typography>
        <Typography variant='body2-regular' className='text-gray-600'>
          정말로 계정을 탈퇴하시겠습니까?
          <br />
          탈퇴한 계정은 복구할 수 없습니다.
        </Typography>
        <div className='flex gap-3'>
          <Button variant='secondary' size='medium' className='flex-1' onClick={() => closeDialog(dialogId)}>
            <Typography variant='body2-bold'>취소</Typography>
          </Button>
          <Button
            variant='primary'
            size='medium'
            className='flex-1'
            onClick={() => {
              closeDialog(dialogId);
              deleteAccount();
            }}
            disabled={isDeleting}
          >
            <Typography variant='body2-bold'>{isDeleting ? '처리 중...' : '탈퇴하기'}</Typography>
          </Button>
        </div>
      </div>,
    );
  };

  return (
    <UserForm onSubmit={handleSubmit} className='min-h-[613px]'>
      <UserForm.Title title='마이 페이지' />
      <UserForm.UserProfileDisplay currentImageUrl={user?.image} />
      <UserForm.FieldGroup fieldName='이름' value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <UserForm.FieldGroup fieldName='이메일' value={email} disabled />
      <div className='mt-auto flex gap-3'>
        <UserForm.FormButton className='w-full' disabled={isUpdating}>
          {isUpdating ? '저장 중...' : '저장'}
        </UserForm.FormButton>
        <Button variant='secondary' size='medium' className='w-full border' onClick={handleDeleteAccount} type='button'>
          계정 탈퇴
        </Button>
      </div>
    </UserForm>
  );
};

export default MyPageForm;
