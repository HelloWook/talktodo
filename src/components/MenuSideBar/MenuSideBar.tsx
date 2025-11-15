'use client';

import { useRouter, usePathname } from 'next/navigation';

import GoalEditDialog from '@/components/GoalEditDialog/GoalEditDialog';
import GoalFormDialog from '@/components/GoalFormDialog/GoalFormDialog';
import SideBar from '@/components/SideBar/SideBar';
import { useDialog } from '@/hooks/useDialog';
import { useGetGoals } from '@/quries/useGoal';
import { useUserStore } from '@/stores/user';
import { formatEmail } from '@/utils/formatEmail';

import MenuSideBarSkeleton from './MenuSideBarSkeleton';

interface MenuSideBarProps {
  className?: string;
}

const MenuSideBar = ({ className }: MenuSideBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { openDialog, closeDialog } = useDialog();
  const user = useUserStore((state) => state.user);
  const { data: goals = [], isLoading } = useGetGoals();

  const handleNewGoalClick = () => {
    const dialogId = openDialog(<GoalFormDialog onClose={() => closeDialog(dialogId)} />);
  };

  const handleGoalClick = (goalId: string) => {
    const goal = goals.find((g) => g.id === goalId);
    if (goal) {
      const dialogId = openDialog(<GoalEditDialog goal={goal} onClose={() => closeDialog(dialogId)} />);
    }
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
        <SideBar.ProfileSection userNickname={user?.nickname ?? 'User'} userEmail={formatEmail(user?.email)} />
      </SideBar.Footer>
    </SideBar>
  );
};

export default MenuSideBar;
