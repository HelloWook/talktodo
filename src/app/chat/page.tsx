'use client';

import ChatRoom from '@/components/Chat/ChatRoom/ChatRoom';
import TaskSelector from '@/components/Chat/TaskSelector/TaskSelector';
import { useChatStep } from '@/hooks/useChatStep';

const ChatPage = () => {
  const { step, selectedGoal, handleGoalSelect, handleNextToChatRoom, handleBackToSelector } = useChatStep();

  return (
    <div className='gradient-bg flex min-h-screen w-full items-center justify-center py-4'>
      {step === 'selector' ? (
        <TaskSelector onGoalSelect={handleGoalSelect} onNextClick={handleNextToChatRoom} />
      ) : (
        <ChatRoom
          goal={selectedGoal?.name || '목표 없음'}
          goalId={selectedGoal?.id}
          onPrevClick={handleBackToSelector}
          onNextClick={() => {}}
        />
      )}
    </div>
  );
};

export default ChatPage;
