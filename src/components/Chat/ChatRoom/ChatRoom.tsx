'use client';

import { ChatHeader, ChatRoomContainer } from './components/index';
import { ChatHeaderProps, ChatRoomAction } from './types';

type ChatRoomProps = ChatHeaderProps & ChatRoomAction & { onNextStep?: () => void };

const ChatRoom = ({ goal, onPrevClick, onNextClick, handleSetTaskSchedules, onNextStep }: ChatRoomProps) => {
  return (
    <div className='m-auto flex h-screen w-[90%] max-w-[968px] flex-col gap-8'>
      <ChatHeader goal={goal} onPrevClick={onPrevClick} onNextClick={onNextClick} />
      <ChatRoomContainer handleSetTaskSchedules={handleSetTaskSchedules} onNextStep={onNextStep} />
    </div>
  );
};

export default ChatRoom;
