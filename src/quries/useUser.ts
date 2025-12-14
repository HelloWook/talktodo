import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { signOutUser } from '@/actions/auth';
import { ApiError } from '@/error/error';
import { useToast } from '@/hooks/useToast';
import { getUser, updateUser, deleteUser } from '@/lib/axios/user.axios';
import { user } from '@/quries/queryKey/queryKeys';
import { useUserStore } from '@/stores/user';

import { UserUpdatePayload } from '../lib/validation/user';

const useGetUser = () => {
  const { data, isLoading, error } = useQuery({
    ...user.detail(),
    queryFn: () => getUser(),
  });
  return { data, isLoading, error };
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const setUser = useUserStore((state) => state.setUser);
  const userData = useUserStore((state) => state.user);

  const { mutate, error, isPending } = useMutation({
    mutationFn: (data: UserUpdatePayload) => updateUser(data),
    onSuccess: (data: { email: string; nickname: string; image?: string | null }) => {
      setUser({
        id: userData?.id || '',
        email: data.email,
        nickname: data.nickname,
        image: data.image || undefined,
      });
      addToast('사용자 정보가 수정되었습니다.');
      queryClient.invalidateQueries({
        queryKey: user.detail().queryKey,
      });
    },
    onError: () => {
      addToast('사용자 정보 수정에 실패했습니다.');
    },
  });

  return { mutate, error, isPending };
};

const useDeleteAccount = () => {
  const router = useRouter();
  const { addToast } = useToast();
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

  const { mutate, error, isPending } = useMutation({
    mutationFn: async () => {
      await deleteUser();
    },
    onSuccess: async () => {
      // 로컬 상태 정리
      deleteAllCookies();
      clearLocalStorage();
      clearUser();

      addToast('계정이 탈퇴되었습니다.');

      // signOutUser는 NEXT_REDIRECT를 발생시키므로 try-catch로 처리
      try {
        await signOutUser();
      } catch (error) {
        // NEXT_REDIRECT는 실제 에러가 아니므로 무시
        // Next.js의 redirect는 digest에 'NEXT_REDIRECT'를 포함한 에러를 throw함
        const isRedirectError =
          error &&
          typeof error === 'object' &&
          'digest' in error &&
          typeof error.digest === 'string' &&
          error.digest.includes('NEXT_REDIRECT');

        if (!isRedirectError) {
          console.error('로그아웃 실패:', error);
          // 리다이렉트가 실패한 경우에만 수동으로 리다이렉트
          router.push('/login');
          window.location.href = '/login';
        }
      }
    },
    onError: (error) => {
      console.error('계정 탈퇴 실패:', error);

      if (error instanceof ApiError) {
        addToast(error.message);
      } else if (error instanceof Error) {
        addToast(error.message || '계정 탈퇴에 실패했습니다.');
      } else {
        addToast('계정 탈퇴에 실패했습니다.');
      }
    },
  });

  return {
    deleteAccount: mutate,
    isDeleting: isPending,
    error,
  };
};

export { useGetUser, useUpdateUser, useDeleteAccount };
