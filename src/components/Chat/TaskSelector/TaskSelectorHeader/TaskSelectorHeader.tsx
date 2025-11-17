import Icon from '@/components/Icon/Icon';
import Typography from '@/components/Typography/Typography';

const TaskSelectorHeader = () => (
  <div className='mb-3'>
    <Typography variant='title2-bold' as='h1' className='tb:mb-10 mb-5 text-gray-900'>
      어떤 목표에 할 일을 추가하시겠어요?
    </Typography>
    <div className='flex items-center gap-1'>
      <Icon name='flag' className='h-6 w-6 text-gray-600' />
      <Typography variant='title3-bold' as='p' className='text-gray-600'>
        기존 목표
      </Typography>
    </div>
  </div>
);

export default TaskSelectorHeader;
