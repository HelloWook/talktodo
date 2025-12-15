'use client';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';

import { useState } from 'react';

import { Message, ChatRoomAction } from '@/components/Chat/ChatRoom/types';

import { sendToLex } from '@/utils/sendToLex';

interface parsedTask {
  task: string;
  date: string;
}

interface UseChatOptions extends ChatRoomAction {
  userId?: string;
  goalId?: string | null;
}

const useChat = ({ handleSetTaskSchedules, userId, goalId }: UseChatOptions) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      message: '안녕하세요. 톡투두의 챗봇입니다. 할 일 정리를 원하신다면 할 일과 날짜를 입력해주세요. \n EX) 내일 책 읽기, 내일 축구하기, 내일 게임하기',
      role: 'assistant',
    }
  ]);

  const handleMessage = (newMessage: Message) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  const { mutate } = useMutation({
    mutationFn: (text: string) => sendToLex(text, 'user'),
    onMutate: async (text) => {
      handleMessage({
        message: text,
        role: 'user',
        temp: false,
      });

      handleMessage({
        message: '채팅을 작성 중 입니다...',
        role: 'assistant',
        temp: true,
      });
    },
    onSuccess: (data) => {
      const [plainTextMsg, customPayloadMsg] = data.messages ?? [];

      if (plainTextMsg?.contentType === 'PlainText') {
        setMessages((prev) => prev.filter((msg) => !(msg.temp && msg.role === 'assistant')));

        handleMessage({
          message: plainTextMsg.content!,
          role: 'assistant',
          temp: false,
        });
      }

      if (customPayloadMsg?.contentType === 'CustomPayload' && customPayloadMsg.content) {
        const parsedContent = JSON.parse(customPayloadMsg.content);

        parsedContent.data.forEach((task: parsedTask) => {
          const date = new Date(task.date);
          const formattedDate = format(date, 'yy-MM-dd');

          handleSetTaskSchedules?.({
            id: crypto.randomUUID(),
            title: task.task,
            startDate: formattedDate,
            repeatDays: [],
            priority: '보통',
            description: '',
            memo: '',
            isDone: false,
            userId: userId || '',
            goalId: goalId || null,
          });
        });
      }
    },
    onError: () => {
      setMessages((prev) => prev.filter((msg) => !(msg.temp && msg.role === 'assistant')));
      handleMessage({
        message: '문제가 발생했어요. 다시 시도해주세요.',
        role: 'assistant',
        temp: false,
      });
    },
  });

  return {
    messages,
    sendMessage: (text: string) => mutate(text),
  };
};
export default useChat;
