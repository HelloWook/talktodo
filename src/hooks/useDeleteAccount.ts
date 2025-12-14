'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { signOutUser } from '@/actions/auth';
import { toastService } from '@/components/Toast/toastService';
import { deleteUser } from '@/lib/axios/user.axios';
import { useUserStore } from '@/stores/user';

export const useDeleteAccount = () => {
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);

  const deleteAllCookies = () => {
    const cookiesToDelete = [
      'authjs.session-token',
      'authjs.csrf-token',
      '__Secure-authjs.session-token',
      '__Host-authjs.csrf-token',
      'ck-url',
    ];

    cookiesToDelete.forEach((cookieName) => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.localhost;`;
    });
  };

  const clearLocalStorage = () => {
    try {
      localStorage.removeItem('user-storage');
      localStorage.clear();
    } catch (error) {
      console.error('로컬 스토리지 삭제 실패:', error);
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      await deleteUser();
      await signOutUser();
      deleteAllCookies();
      clearLocalStorage();
      clearUser();
    },
    onSuccess: () => {
      toastService.addToast('계정이 탈퇴되었습니다.');
      router.push('/login');
      window.location.href = '/login';
    },
    onError: () => {
      toastService.addToast('계정 탈퇴에 실패했습니다.');
    },
  });

  return {
    deleteAccount: mutation.mutate,
    isDeleting: mutation.isPending,
    error: mutation.error,
  };
};
