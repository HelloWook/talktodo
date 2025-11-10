'use client';
import Fab from '@/components/Fab/Fab';
import MenuSideBar from '@/components/MenuSideBar';
import TaskContainer from '@/components/TaskContainer/TaskContainer';
import TaskFormDialog from '@/components/TaskFormDialog/TaskFormDialog';
import { useDialog } from '@/hooks/useDialog';

export default function Home() {
  const { openDialog, closeDialog } = useDialog();

  const handleTaskChange = () => {};

  return (
    <div className='flex h-screen w-screen overflow-hidden bg-purple-50'>
      <MenuSideBar />
      <TaskContainer />
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
