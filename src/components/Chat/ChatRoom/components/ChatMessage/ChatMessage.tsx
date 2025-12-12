'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { cn } from '@/utils/cn';

import { ChatMessageProps } from '../../types';

interface StyleElement {
  bg: string;
  text: string;
  position: string;
}

const chatMessageStyles: Record<ChatMessageProps['role'], StyleElement> = {
  user: {
    bg: 'bg-purple-600 px-6',
    text: 'text-white font-body3-medium-loose',
    position: 'justify-end',
  },
  assistant: {
    bg: 'bg-none px-0',
    text: 'text-white font-body2-bold',
    position: 'justify-start',
  },
} as const;

const ChatMessage = ({ message, role }: ChatMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(`flex items-center gap-6`, chatMessageStyles[role].position)}
    >
      {role === 'assistant' && <Image src='/img/UnCompletedCharacter.png' alt='Chat Character' width={64} height={64} />}
      <div className={cn('flex w-fit max-w-[600px] items-center gap-3 rounded-3xl p-4', chatMessageStyles[role].bg)}>
        <p className={cn('break-all text-white', chatMessageStyles[role].text)}>{message}</p>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
