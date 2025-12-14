'use client';

import MenuSideBar from '@/components/MenuSideBar/MenuSideBar';
import MenuSideBarSkeleton from '@/components/MenuSideBar/MenuSideBarSkeleton';
import MyPageForm from '@/components/MyPageForm/MyPageForm';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useGetGoals } from '@/quries/useGoal';

const MyPage = () => {
  const isMobile = useMediaQuery('(max-width: 1280px)');
  const { isLoading: isGoalsLoading } = useGetGoals();

  return (
    <div className={`flex h-screen w-screen overflow-x-hidden overflow-y-scroll bg-purple-50 ${isMobile ? 'flex-col' : 'flex-row'}`}>
      <div className={isMobile ? 'w-full' : ''}>{isGoalsLoading ? <MenuSideBarSkeleton /> : <MenuSideBar />}</div>
      <main className='relative mx-auto flex h-full w-full max-w-[800px] items-center justify-center p-4'>
        <MyPageForm />
      </main>
    </div>
  );
};

export default MyPage;
