'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import GoalFormDialog from '@/components/GoalFormDialog/GoalFormDialog';
import SideBar from '@/components/SideBar/SideBar';
import { useDialog } from '@/hooks/useDialog';
import { useGetGoals } from '@/quries/useGoal';

import MenuSideBarSkeleton from './MenuSideBarSkeleton';

interface UserInfo {
  nickname: string;
  email: string;
}

interface MenuSideBarProps {
  className?: string;
}

const MenuSideBar = ({ className }: MenuSideBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { openDialog, closeDialog } = useDialog();
  const [userInfo, setUserInfo] = useState<UserInfo>({ nickname: 'User', email: 'user@example.com' });
  const { data: goals = [], isLoading } = useGetGoals();

  useEffect(() => {
    // TODO: API 호출로 사용자 정보 가져오기
    const fetchUserInfo = async () => {
      try {
        setUserInfo({
          nickname: 'John Doe',
          email: 'john.doe@example.com',
        });
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleNewGoalClick = () => {
    const dialogId = openDialog(<GoalFormDialog onClose={() => closeDialog(dialogId)} />);
  };

  const handleGoalClick = (goalId: string) => {
    router.push(`/goal/${goalId}`);
  };

  const handleGoalGroupClick = () => {
    router.push('/goal');
  };

  const handleDashboardClick = () => {
    router.push('/');
  };

  if (isLoading) {
    return <MenuSideBarSkeleton />;
  }

  return (
    <SideBar className={className}>
      <SideBar.Content>
        <SideBar.Header />

        <SideBar.MenuGroup title='홈' icon='home' onTitleClick={handleDashboardClick} />

        <SideBar.MenuGroup
          title='마이 페이지'
          icon='user'
          onTitleClick={() => {
            router.push('/mypage');
          }}
        />

        <SideBar.MenuGroup title='목표' icon='flag' onTitleClick={handleGoalGroupClick}>
          {goals.map((goal) => (
            <SideBar.MenuItem
              key={goal.id}
              label={goal.name}
              isActive={pathname === `/goal/${goal.id}`}
              onClick={() => handleGoalClick(goal.id)}
            />
          ))}
        </SideBar.MenuGroup>

        <SideBar.NewGoalButton onClick={handleNewGoalClick} />
      </SideBar.Content>

      <SideBar.Footer>
        <SideBar.ProfileSection userNickname={userInfo.nickname} userEmail={userInfo.email} />
      </SideBar.Footer>
    </SideBar>
  );
};

export default MenuSideBar;
