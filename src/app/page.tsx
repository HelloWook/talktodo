'use client';
import Fab from '@/components/Fab/Fab';
import SideBar from '@/components/SideBar/SideBar';

export default function Home() {
  return (
    <div className='h-screen w-screen'>
      <SideBar
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

      <Fab items={['item1', 'item2', 'item3']} size='small' className='absolute right-10 bottom-10' />
    </div>
  );
}
