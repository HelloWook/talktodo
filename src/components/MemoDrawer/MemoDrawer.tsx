'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

import Icon from '@/components/Icon/Icon';
import Typography from '@/components/Typography/Typography';
import { Task } from '@/types';
import { cn } from '@/utils/cn';

import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '../ui/drawer';

interface MemoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onSaveMemo: (taskId: string, memo: string) => void;
}

const MemoDrawer = ({ isOpen, onClose, task, onSaveMemo }: MemoDrawerProps) => {
  const [memo, setMemo] = useState(task?.memo || '');
  const [isEditMode, setIsEditMode] = useState(true);

  React.useEffect(() => {
    if (task) {
      setMemo(task.memo || '');
    }
  }, [task]);

  const handleSave = () => {
    if (task) {
      onSaveMemo(task.id, memo);
      onClose();
    }
  };

  const handleCancel = () => {
    setMemo(task?.memo || '');
    onClose();
  };

  if (!task) return null;

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && handleCancel()} direction='right'>
      <DrawerContent className='h-full w-full max-w-3xl bg-gray-50 sm:max-w-3xl'>
        <DrawerHeader className='border-b border-gray-200 bg-white'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <DrawerTitle>
                <Typography variant='title3-semibold' as='span' className='text-gray-900'>
                  {task.title}
                </Typography>
              </DrawerTitle>
              <DrawerClose asChild>
                <button className='cursor-pointer text-gray-400 transition-colors hover:text-gray-600' aria-label='닫기'>
                  <Icon name='close' className='h-5 w-5' />
                </button>
              </DrawerClose>
            </div>
          </div>

          {/* 탭 스타일 버튼 */}
          <div className='mt-4 flex gap-1'>
            <button
              onClick={() => setIsEditMode(true)}
              className={cn(
                'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all',
                isEditMode ? 'bg-purple-500 text-white shadow-sm' : 'bg-transparent text-gray-600 hover:bg-gray-100',
              )}
              type='button'
            >
              편집
            </button>
            <button
              onClick={() => setIsEditMode(false)}
              className={cn(
                'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all',
                !isEditMode ? 'bg-purple-500 text-white shadow-sm' : 'bg-transparent text-gray-600 hover:bg-gray-100',
              )}
              type='button'
            >
              미리보기
            </button>
          </div>
        </DrawerHeader>

        <div className='flex-1 overflow-auto p-6'>
          {isEditMode ? (
            <div className='h-full'>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className={cn(
                  'h-full w-full resize-none rounded-xl border-0 bg-white p-6 shadow-sm',
                  'text-sm leading-relaxed text-gray-800',
                  'placeholder:text-gray-400',
                  'focus:ring-2 focus:ring-purple-500/20 focus:outline-none',
                )}
                placeholder='# 마크다운으로 작성하세요

**굵게**, *기울임*, ~~취소선~~

- 목록 항목
- 또 다른 항목

> 인용문

`코드` 또는 코드 블록도 사용 가능합니다.'
                aria-label='메모 입력'
              />
            </div>
          ) : (
            <div className='h-full rounded-xl bg-white p-6 shadow-sm'>
              {memo ? (
                <div className={cn('markdown-preview max-w-none')}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSanitize]}>
                    {memo}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className='flex h-full items-center justify-center'>
                  <Typography variant='body2-medium-tight' className='text-gray-400'>
                    메모가 없습니다
                  </Typography>
                </div>
              )}
            </div>
          )}
        </div>

        <div className='border-t border-gray-200 bg-white p-4'>
          <div className='flex justify-end gap-2'>
            <button
              onClick={handleCancel}
              className='rounded-lg px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100'
              type='button'
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className='rounded-lg bg-purple-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-purple-600'
              type='button'
            >
              저장
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MemoDrawer;
