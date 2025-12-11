'use client';

import { Message } from '../../types';
import ChatMessage from '../ChatMessage/ChatMessage';

interface ChatContentProps {
  messages: Message[];
}

const ChatContent = ({ messages }: ChatContentProps) => {
  return (
    <div className='scrollbar-hide flex flex-1 flex-col-reverse overflow-y-auto'>
      <div className='flex flex-grow flex-col justify-end gap-5'>
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.message} role={msg.role} />
        ))}
      </div>
    </div>
  );
};

export default ChatContent;
