'use client';
import Image from 'next/image';

import { useState } from 'react';

import GoalSelectorButton from '@/components/Chat/TaskSelector/GoalSelectorButton/GoalSelectorButton';
import TaskSelectorAction from '@/components/Chat/TaskSelector/TaskSelectorAction/TaskSelectorAction';
import TaskSelectorHeader from '@/components/Chat/TaskSelector/TaskSelectorHeader/TaskSelectorHeader';
import TaskSelectorSkeleton from '@/components/Chat/TaskSelector/TaskSelectorSkeleton';
import GoalFormDialog from '@/components/GoalFormDialog/GoalFormDialog';
import { useDialog } from '@/hooks/useDialog';
import { useGetGoals } from '@/quries/useGoal';
import type { Goal } from '@/types';

const TaskSelector = () => {
  const { data: goals = [], isLoading } = useGetGoals();
  const [activeGoal, setActiveGoal] = useState<Goal | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { openDialog, closeDialog } = useDialog();

  const handleGoalClick = (goal: Goal) => {
    setActiveGoal(goal);
  };

  const handleNewGoalClick = () => {
    const dialogId = openDialog(<GoalFormDialog onClose={() => closeDialog(dialogId)} />);
  };

  const handleNextClick = () => {
    if (activeGoal) {
      alert('다음 단계로 이동합니다.');
    }
  };

  if (isLoading) {
    return <TaskSelectorSkeleton />;
  }

  return (
    <div className='m-auto flex w-full max-w-[624px] flex-col items-center justify-center'>
      <div className='relative mb-3 -translate-x-6'>
        <Image
          src='/img/unCompletedCharacter.png'
          alt='chat character'
          width={110}
          height={120}
          className={`mb-3 transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsImageLoading(false)}
        />
      </div>
      <div className='w-[95%] rounded-4xl bg-white p-9 shadow'>
        <TaskSelectorHeader />
        {
          <div className='scrollbar-hide flex h-[350px] flex-col gap-2 overflow-y-scroll'>
            {goals.map((goal) => (
              <GoalSelectorButton key={goal.id} active={activeGoal?.id === goal.id} onClick={() => handleGoalClick(goal)} goal={goal} />
            ))}
          </div>
        }
        <TaskSelectorAction onNewGoalClick={handleNewGoalClick} onNextClick={handleNextClick} />
      </div>
    </div>
  );
};
export default TaskSelector;
