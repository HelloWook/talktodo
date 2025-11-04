'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import SideBar from '@/components/SideBar/SideBar';

export interface Goal {
  id: string;
  name: string;
}

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
  const [userInfo, setUserInfo] = useState<UserInfo>({ nickname: 'User', email: 'user@example.com' });
  const [goals, setGoals] = useState<Goal[]>([]);

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

    // TODO: API 호출로 목표 리스트 가져오기
    const fetchGoals = async () => {
      try {
        setGoals([
          { id: 'goal_001', name: '업무' },
          { id: 'goal_002', name: '건강' },
          { id: 'goal_003', name: '자기계발' },
        ]);
      } catch (error) {
        console.error('Failed to fetch goals:', error);
      }
    };

    fetchUserInfo();
    fetchGoals();
  }, []);

  const handleNewGoalClick = () => {
    // TODO: 새 목표 생성 API 호출 및 모달 열기
    console.log('새 목표 모달 열기');
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
