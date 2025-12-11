'use client';

import { useState } from 'react';

import ChatRoom from '@/components/Chat/ChatRoom/ChatRoom';
import TaskSelector from '@/components/Chat/TaskSelector/TaskSelector';
import type { Goal } from '@/types';

type ChatStep = 'selector' | 'chatroom';

const ChatPage = () => {
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

  const handleSetTaskSchedules = (schedules: { content: string; taskDate: string }) => {
    console.log('Task schedules:', schedules);
  };

  const handleNextStep = () => {
    console.log('Next step');
  };

  return (
    <div className='gradient-bg flex h-screen w-screen items-center'>
      {step === 'selector' ? (
        <TaskSelector onGoalSelect={handleGoalSelect} onNextClick={handleNextToChatRoom} />
      ) : (
        <ChatRoom
          goal={selectedGoal?.name || '목표 없음'}
          onPrevClick={handleBackToSelector}
          onNextClick={() => {}}
          handleSetTaskSchedules={handleSetTaskSchedules}
          onNextStep={handleNextStep}
        />
      )}
    </div>
  );
};

export default ChatPage;
