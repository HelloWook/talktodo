import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/hooks/useToast';

import { getGoals, createGoal } from '@/lib/axios/goal.axios';
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

export { useGetGoals, useCreateGoal };
