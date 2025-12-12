import Button from '@/components/Button/Button';
import Typography from '@/components/Typography/Typography';

interface TaskSelectorActionProps {
  onNewGoalClick: () => void;
  onNextClick: () => void;
}
const TaskSelectorAction = ({ onNewGoalClick, onNextClick }: TaskSelectorActionProps) => {
  return (
    <div className='mt-4 flex w-full gap-2'>
      <Button variant='secondary' size='large' className='w-full flex-1/2 p-7' onClick={onNewGoalClick}>
        <Typography variant='body2-medium-tight' as='p' className='text-primary'>
          새로운 목표를 만들래요
        </Typography>
      </Button>
      <Button variant='primary' size='large' className='w-full flex-1/2 p-7' onClick={onNextClick}>
        <Typography variant='body2-medium-tight' as='p' className='text-white'>
          다음
        </Typography>
      </Button>
    </div>
  );
};
export default TaskSelectorAction;
