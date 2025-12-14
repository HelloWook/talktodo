import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { signOutUser } from '@/actions/auth';
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

      try {
        await signOutUser();
      } catch (error) {
        const isRedirectError =
          error &&
          typeof error === 'object' &&
          'digest' in error &&
          typeof error.digest === 'string' &&
          error.digest.includes('NEXT_REDIRECT');

        if (!isRedirectError) {
          console.error('로그아웃 실패:', error);
          router.push('/login');
          window.location.href = '/login';
        }
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
