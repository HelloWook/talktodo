'use client';

import { useState } from 'react';

import { DateSubHeader } from '@/components/DateSubHeader';
import Fab from '@/components/Fab/Fab';
import TaskHeader from '@/components/Header/TaskHeader/TaskHeader';
import SideBar from '@/components/SideBar/SideBar';
import { TaskBoard } from '@/components/TaskBoard';
import TaskFormDialog from '@/components/TaskFormDialog/TaskFormDialog';
import type { LayoutType } from '@/components/TaskViewContainer/TaskViewContainer.types';
import { useDialog } from '@/hooks/useDialog';
import type { Task } from '@/types/Task';

// Mock 데이터
const mockTasks: Task[] = [
  {
    id: '1',
    title: '프로젝트 회의 준비',
    description: '다음 주 월요일 프로젝트 회의 자료 준비하기',
    memo: '발표 자료 10장 정도 필요',
    priority: '중요',
    repeatDays: ['월', '수', '금'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isDone: false,
    goal: { id: 'g1', name: '업무' },
  },
  {
    id: '2',
    title: '운동하기',
    description: '헬스장에서 1시간 운동',
    memo: '가슴, 등 운동 집중',
    priority: '보통',
    repeatDays: ['월', '수', '금'],
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-16'),
    isDone: true,
    goal: { id: 'g2', name: '건강' },
  },
  {
    id: '3',
    title: '책 읽기',
    description: '클린 코드 3장까지 읽기',
    memo: '중요한 내용 노트 정리',
    priority: '보통',
    repeatDays: ['화', '목'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isDone: false,
    goal: { id: 'g3', name: '자기계발' },
  },
  {
    id: '4',
    title: '장보기',
    description: '주말 장보기 - 마트 방문',
    memo: '우유, 계란, 빵, 과일 구매',
    priority: '낮음',
    repeatDays: ['토'],
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-17'),
    isDone: true,
    goal: { id: 'g4', name: '일상' },
  },
  {
    id: '5',
    title: '코드 리뷰',
    description: '팀원 코드 리뷰 진행',
    memo: '성능 최적화 부분 집중 검토',
    priority: '중요',
    repeatDays: ['월', '화', '수', '목', '금'],
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
    isDone: false,
    goal: { id: 'g1', name: '업무' },
  },
  {
    id: '6',
    title: '영어 공부',
    description: '영어 회화 30분 학습',
    memo: '유튜브 영어 회화 강의 시청',
    priority: '보통',
    repeatDays: ['월', '화', '수', '목', '금'],
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
    isDone: false,
    goal: { id: 'g3', name: '자기계발' },
  },
];

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [layout, setLayout] = useState<LayoutType>('card');
  const { openDialog, closeDialog } = useDialog();

  const handleDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTaskChange = () => {};

  const handleLayoutChange = (newLayout: LayoutType) => {
    setLayout(newLayout);
  };

  return (
    <div className='flex h-screen w-screen overflow-hidden bg-purple-50'>
      <SideBar userNickname='John Doe' userEmail='john.doe@example.com' goals={[]} />

      <main className='relative mx-auto flex h-full w-full max-w-[1080px] flex-col p-4'>
        <TaskHeader tasks={mockTasks} />

        <DateSubHeader
          className='py-4'
          selectedDate={selectedDate}
          onDateChange={handleDate}
          layout={layout}
          onLayoutChange={handleLayoutChange}
        />

        <TaskBoard className='flex-1 overflow-hidden' tasks={mockTasks} layout={layout} onToggleDone={() => {}} onOpenMemo={() => {}} />
      </main>
      <Fab
        size='small'
        items={[
          {
            label: '할 일 생성하기',
            onClick: () => {
              const id = openDialog(<TaskFormDialog onTaskChange={handleTaskChange} onClose={() => closeDialog(id)} />);
            },
          },
        ]}
        className='absolute right-10 bottom-10'
      />
    </div>
  );
}
