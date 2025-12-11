'use client';

import React from 'react';

import useChat from '@/quries/useChat';

import { ChatRoomAction } from '../../types';
import ChatContent from '../ChatContent/ChatContent';
import ChatForm from '../ChatForm/ChatForm';

interface ChatRoomContainerProps extends ChatRoomAction {
  onNextStep?: () => void;
}

const ChatRoomContainer = ({ handleSetTaskSchedules, onNextStep }: ChatRoomContainerProps) => {
  const { messages, sendMessage } = useChat({ handleSetTaskSchedules, onNextStep });

  return (
    <>
      <ChatContent messages={messages} />
      <ChatForm onSendMessage={sendMessage} />
    </>
  );
};

export default ChatRoomContainer;
