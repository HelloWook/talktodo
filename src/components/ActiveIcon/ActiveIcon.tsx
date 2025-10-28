import { cn } from '@/utils/cn';

import Icon from '../Icon/Icon';

interface ActiveIconProps {
  active: boolean;
  className?: string;
}

const ActiveIcon = ({ active, className }: ActiveIconProps) => {
  const activeStyle = active ? 'fill-purple-200 text-purple-500' : 'fill-white text-purple-500';
  return <Icon name={'active'} className={cn(activeStyle, className)} />;
};

export default ActiveIcon;
