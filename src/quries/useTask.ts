import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { format } from 'date-fns';

import { useToast } from '@/hooks/useToast';

import { getTasks, createTask, updateTask } from '@/lib/axios/task.axios';
import { tasks } from '@/quries/queryKey/queryKeys';
import { Task } from '@/types';
import { GetTaskParams, UpdateTaskParams } from '@/types/params';

import { TaskPayload } from '../lib/validation/task';

const useGetTasks = (params: GetTaskParams) => {
  const { data, isLoading, error } = useQuery({
    ...tasks.list({ userId: params.userId, startDate: params.startDate }),
    queryFn: () => getTasks(params),
    enabled: !!params.userId && params.userId.trim() !== '',
  });
  return { data, isLoading, error };
};

/**
 * 할 일 목록을 prefetch하는 함수
 * @param queryClient - QueryClient 인스턴스
 * @param params - 할 일 조회 파라미터
 */
export const prefetchTasks = async (queryClient: ReturnType<typeof useQueryClient>, params: GetTaskParams) => {
  if (!params.userId || params.userId.trim() === '') {
    return;
  }

  await queryClient.prefetchQuery({
    ...tasks.list({ userId: params.userId, startDate: params.startDate }),
    queryFn: () => getTasks(params),
  });
};

const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const { mutate, error } = useMutation({
    mutationFn: (task: TaskPayload) => createTask(task),
    onSuccess: (data, variables) => {
      const startDate = format(variables.startDate, 'yyyy-MM-dd');
      queryClient.invalidateQueries({
        queryKey: tasks.list({
          userId: variables.userId,
          startDate,
        }).queryKey,
      });
      addToast('🎉 할 일이 생성되었습니다.');
    },
  });
  return { mutate, error };
};

const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const { mutate, error } = useMutation({
    mutationFn: (params: UpdateTaskParams) => updateTask(params),
    onMutate: async (variables) => {
      const startDate = format(variables.data.startDate, 'yyyy-MM-dd');
      const queryKey = tasks.list({
        userId: variables.data.userId,
        startDate,
      }).queryKey;

      await queryClient.cancelQueries({ queryKey });

      const previousTasks = queryClient.getQueryData<Task[]>(queryKey);

      queryClient.setQueryData<Task[]>(queryKey, (old) => {
        if (!old) return old;
        return old.map((task) => (task.id === variables.id ? { ...task, ...variables.data } : task));
      });

      return { previousTasks, queryKey };
    },
    onError: (err, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(context.queryKey, context.previousTasks);
      }
    },
    onSuccess: () => {},
    onSettled: (data, error, variables) => {
      const startDate = format(variables.data.startDate, 'yyyy-MM-dd');
      queryClient.invalidateQueries({
        queryKey: tasks.list({
          userId: variables.data.userId,
          startDate,
        }).queryKey,
      });
    },
  });
  return { mutate, error };
};

export { useGetTasks, useCreateTask, useUpdateTask };
