import Button from '@/components/Button/Button';
import Typography from '@/components/Typography/Typography';
import useMediaQuery from '@/hooks/useMediaQuery';

interface TaskSelectorActionProps {
  onNewGoalClick: () => void;
  onNextClick: () => void;
}
const TaskSelectorAction = ({ onNewGoalClick, onNextClick }: TaskSelectorActionProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <div className='mt-4 flex w-full gap-2'>
      <Button variant='secondary' size={isMobile ? 'medium' : 'large'} className='w-full flex-1/2 p-7' onClick={onNewGoalClick}>
        <Typography variant='body2-medium-tight' as='p' className='text-primary'>
          {isMobile ? '목표 추가' : '새로운 목표를 만들래요'}
        </Typography>
      </Button>
      <Button variant='primary' size={isMobile ? 'medium' : 'large'} className='w-full flex-1/2 p-7' onClick={onNextClick}>
        <Typography variant='body2-medium-tight' as='p' className='text-white'>
          다음
        </Typography>
      </Button>
    </div>
  );
};
export default TaskSelectorAction;
