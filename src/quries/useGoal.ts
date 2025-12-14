import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/hooks/useToast';

import { getGoals, createGoal, updateGoal, deleteGoal } from '@/lib/axios/goal.axios';
import { goals } from '@/quries/queryKey/queryKeys';

import { GoalPayload } from '../lib/validation/goal';

const useGetGoals = () => {
  const { data, isLoading, error } = useQuery({
    ...goals.list(),
    queryFn: () => getGoals(),
  });
  return { data, isLoading, error };
};

const useCreateGoal = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const { mutate, error } = useMutation({
    mutationFn: (goal: GoalPayload) => createGoal(goal),
    onSuccess: () => {
      addToast('🎉 목표가 생성되었습니다.');
      queryClient.invalidateQueries({
        queryKey: goals.list().queryKey,
      });
    },
  });

  return { mutate, error };
};

const useUpdateGoal = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const { mutate, error } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: GoalPayload }) => updateGoal(id, data),
    onSuccess: () => {
      addToast('🎉 목표가 수정되었습니다.');
      queryClient.invalidateQueries({
        queryKey: goals.list().queryKey,
      });
    },
  });

  return { mutate, error };
};

const useDeleteGoal = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const { mutate, error } = useMutation({
    mutationFn: (id: string) => deleteGoal(id),
    onSuccess: () => {
      addToast('🗑️ 목표가 삭제되었습니다.');
      queryClient.invalidateQueries({
        queryKey: goals.list().queryKey,
      });
    },
  });

  return { mutate, error };
};

export { useGetGoals, useCreateGoal, useUpdateGoal, useDeleteGoal };
