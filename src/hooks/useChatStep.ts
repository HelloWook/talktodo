import { useState } from 'react';

import type { Goal } from '@/types';

export type ChatStep = 'selector' | 'chatroom';

interface UseChatStepReturn {
  step: ChatStep;
  selectedGoal: Goal | null;
  handleGoalSelect: (goal: Goal) => void;
  handleNextToChatRoom: () => void;
  handleBackToSelector: () => void;
}

export const useChatStep = (): UseChatStepReturn => {
  const [step, setStep] = useState<ChatStep>('selector');
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const handleGoalSelect = (goal: Goal) => {
    setSelectedGoal(goal);
  };

  const handleNextToChatRoom = () => {
    if (selectedGoal) {
      setStep('chatroom');
    }
  };

  const handleBackToSelector = () => {
    setStep('selector');
  };

  return {
    step,
    selectedGoal,
    handleGoalSelect,
    handleNextToChatRoom,
    handleBackToSelector,
  };
};
