'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { MessageSendButton, TextArea } from './index';

const chatFormSchema = z.object({
  message: z.string().min(1, '메시지를 입력해주세요'),
});

type ChatFormData = z.infer<typeof chatFormSchema>;

interface ChatFormProps {
  onSendMessage: (message: string) => void;
}

const ChatForm = ({ onSendMessage }: ChatFormProps) => {
  const { register, handleSubmit, control, getValues, reset } = useForm<ChatFormData>({
    resolver: zodResolver(chatFormSchema),
  });

  const hasMessage = useWatch({ control, name: 'message' })?.trim() !== '';

  const onSubmit = (data: ChatFormData) => {
    onSendMessage(data.message);
    reset();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const value = getValues('message');
      if (value.trim()) {
        handleSubmit(onSubmit)();
      }
    }
  };

  return (
    <form
      className='mb-[40px] flex h-[120px] w-full items-start justify-center gap-3 rounded-[28px] bg-white p-6'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextArea {...register('message')} placeholder='할 일을 입력해주세요' onKeyDown={handleKeyDown} />
      <MessageSendButton active={hasMessage} />
    </form>
  );
};

export default ChatForm;
