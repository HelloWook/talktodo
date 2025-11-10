import type { Task } from '@/types';

import Header from '../Header/Header';

interface TaskHeaderProps {
  tasks: Task[];
}

const TaskHeader = ({ tasks }: TaskHeaderProps) => {
  return (
    <Header.Provider tasks={tasks}>
      <Header className='mb-3'>
        <Header.Content />
      </Header>
    </Header.Provider>
  );
};

export default TaskHeader;
