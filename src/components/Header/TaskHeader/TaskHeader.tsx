import type { Task } from '@/types/Task';

import Header from '../Header';

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
