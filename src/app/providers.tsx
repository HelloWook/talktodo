'use client';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren, useMemo } from 'react';

import { useErrorHandler } from '@/hooks/useErrorHandler';

export function Providers({ children }: PropsWithChildren) {
  const { handleError } = useErrorHandler();

  const queryClient = useMemo(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            handleError(error, '조회 중 오류가 발생했습니다.');
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            handleError(error, '처리 중 오류가 발생했습니다.');
          },
        }),
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 10,
          },
          mutations: {
            retry: 0,
          },
        },
      }),
    [handleError],
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
