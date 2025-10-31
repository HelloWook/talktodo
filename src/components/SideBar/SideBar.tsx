'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

import { cn } from '@/utils/cn';

import MenuGroup from './_components/MenuGroup';
import NewGoalButton from './_components/NewGoalButton';
import SidebarHeader from './_components/SidebarHeader';
import SidebarProfileSection from './_components/SidebarProfileSection';
import SidebarSeparator from './_components/SidebarSeparator';

interface Goal {
  id: string;
  goalName: string;
}

interface SidebarProps {
  userNickname: string;
  userEmail: string;
  goals: Goal[] | string[];
  className?: string;
}

const SideBar = ({ userNickname, userEmail, goals, className }: SidebarProps) => {
  const [isFold, setIsFold] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNewGoalClick = () => {
    console.log('새 목표 모달 열기');
  };

  const handleFoldToggle = () => {
    setIsFold(!isFold);
  };

  // 목표 메뉴 아이템들
  const goalItems = goals.map((goal, index) => {
    const goalName = typeof goal === 'string' ? goal : goal.goalName;
    const goalId = typeof goal === 'string' ? `goal_00${index + 1}` : goal.id;

    return {
      id: goalId,
      label: goalName,
      isActive: pathname === `/goal/${goalId}`,
      onClick: () => router.push(`/goal/${goalId}`),
    };
  });

  const handleGoalGroupClick = () => {
    router.push('/goal');
  };

  return (
    <aside className={cn('h-full p-5', className)}>
      <div
        className={`scrollbar-hide box-border flex h-full flex-col items-center justify-between ${!isFold && 'overflow-y-scroll'} rounded-[20px] bg-white shadow-[0px_0px_12px_0px_rgba(235,235,235,1.00)] transition-all duration-300 ${isFold ? 'w-20' : 'w-64'}`}
      >
        <div className={`box-border flex w-full flex-1 flex-col ${isFold ? `px-3` : `px-5`} `}>
          <SidebarHeader isFold={isFold} onFoldToggle={handleFoldToggle} />

          <MenuGroup title='대시보드' icon='home' items={[]} isFold={isFold} />

          <MenuGroup title='목표' icon='flag' items={goalItems} isFold={isFold} onTitleClick={handleGoalGroupClick} />

          <NewGoalButton isFold={isFold} onClick={handleNewGoalClick} />
        </div>

        <div className='box-border h-[120px] p-5'>
          <SidebarProfileSection isFold={isFold} userNickname={userNickname} userEmail={userEmail} />
        </div>
      </div>
    </aside>
  );
};

// 컴파운드 패턴을 위한 서브 컴포넌트들
SideBar.Header = SidebarHeader;
SideBar.MenuGroup = MenuGroup;
SideBar.ProfileSection = SidebarProfileSection;
SideBar.Separator = SidebarSeparator;
SideBar.NewGoalButton = NewGoalButton;

export default SideBar;
