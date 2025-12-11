import Icon from '@/components/Icon/Icon';
import { cn } from '@/utils/cn';

interface MessageSendButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const MessageSendButton = ({ active, ...props }: MessageSendButtonProps) => {
  const isActiveStyle = active ? 'bg-purple-700' : 'bg-gray-300';

  return (
    <button
      type='submit'
      aria-label='메시지 전송'
      className={cn(isActiveStyle, 'flex h-[56px] w-[56px] cursor-pointer items-center justify-center rounded-full')}
      disabled={!active}
      {...props}
    >
      <Icon name='send' className='h-8 w-8 text-white' />
    </button>
  );
};

export default MessageSendButton;
