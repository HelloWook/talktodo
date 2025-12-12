'use client';

import React from 'react';

import useChat from '@/quries/useChat';

import { ChatRoomAction } from '../../types';
import ChatContent from '../ChatContent/ChatContent';
import ChatForm from '../ChatForm/ChatForm';

interface ChatRoomContainerProps extends ChatRoomAction {
  onNextStep?: () => void;
  userId?: string;
  goalId?: string | null;
}

const ChatRoomContainer = ({ handleSetTaskSchedules, userId, goalId }: ChatRoomContainerProps) => {
  const { messages, sendMessage } = useChat({ handleSetTaskSchedules, userId, goalId });

  return (
    <>
      <ChatContent messages={messages} />
      <ChatForm onSendMessage={sendMessage} />
    </>
  );
};

export default ChatRoomContainer;
