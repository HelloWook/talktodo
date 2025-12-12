'use client';
import { useMutation } from '@tanstack/react-query';
import React, { useRef, useState, useEffect } from 'react';

import { toastService } from '@/components/Toast/toastService';
import { updateUser } from '@/lib/axios/user.axios';
import { useUserStore } from '@/stores/user';
import { formatEmail } from '@/utils/formatEmail';

import UserForm from '../UserForm/UserForm';

const MyPageForm = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState<string | undefined>(undefined);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || '');
      // 이메일에서 중복된 도메인 제거 (예: wookgod01@naver.com@google.com -> wookgod01@naver.com)
      setEmail(formatEmail(user.email) || '');
      setImage(user.image);
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: async (data: { nickname: string; image?: string }) => {
      return await updateUser(data);
    },
    onSuccess: (data) => {
      setUser({
        id: user?.id || '',
        email: data.email,
        nickname: data.nickname,
        image: data.image || undefined,
      });
      toastService.addToast('사용자 정보가 수정되었습니다.');
      setSelectedFile(null);
    },
    onError: () => {
      toastService.addToast('사용자 정보 수정에 실패했습니다.');
    },
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    // 이미지를 base64로 변환하여 미리보기용으로 저장
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 이미지가 없거나 빈 문자열인 경우 undefined로 처리
    const imageUrl = image && image.trim() !== '' ? image : undefined;

    // 파일이 선택된 경우, 여기서는 일단 현재 이미지 URL을 유지
    // 실제 프로덕션에서는 이미지 업로드 API를 호출해야 할 수 있습니다
    if (selectedFile) {
      // TODO: 이미지 업로드 API 호출 후 URL 받아오기
      // 현재는 기존 이미지 URL 유지
    }

    // 이메일은 수정 불가이므로 제외
    const payload: { nickname: string; image?: string } = {
      nickname: nickname.trim(),
    };

    if (imageUrl) {
      payload.image = imageUrl;
    }

    mutation.mutate(payload);
  };

  return (
    <>
      <UserForm onSubmit={handleSubmit}>
        <UserForm.Title title='마이 페이지' />
        <UserForm.UserProfileUpload imageRef={imageRef} currentImageUrl={user?.image} onFileSelect={handleFileSelect} />
        <UserForm.FieldGroup fieldName='이름' value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <UserForm.FieldGroup fieldName='이메일' value={email} disabled />
        <UserForm.FormButton className='mt-auto w-full p-6' disabled={mutation.isPending}>
          {mutation.isPending ? '저장 중...' : '저장'}
        </UserForm.FormButton>
      </UserForm>
    </>
  );
};

export default MyPageForm;
