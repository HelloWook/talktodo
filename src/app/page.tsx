'use client';
import SideBar from '@/components/SideBar/SideBar';

import { useToast } from '@/hooks/useToast';

export default function Home() {
  const { addToast } = useToast();

  return (
    <div className='h-screen w-screen'>
      <SideBar
        onFoldToggle={() => {}}
        userNickname='John Doe'
        userEmail='john.doe@example.com'
        goals={[
          '밥먹기',
          '책읽기',
          '운동하기',
          '코딩하기',
          '놀기',
          '잠자기',
          '먹기',
          '읽기',
          '운동하기',
          '코딩하기',
          '놀기',
          '잠자기',
          '먹기',
          '읽기',
          '운동하기',
          '코딩하기',
        ]}
      />
    </div>
  );
}
