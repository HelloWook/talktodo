import { cn } from '@/utils/cn';

interface IconProps {
  name: string;
  className?: string;
  ariaLabel?: string;
}

// 아이콘별 viewBox 매핑
const iconViewBoxes: Record<string, string> = {
  profile: '0 0 40 40',
  // 다른 아이콘들도 필요에 따라 추가할 수 있습니다
};

const Icon = ({ name, className, ariaLabel = name }: IconProps) => {
  const viewBox = iconViewBoxes[name] || '0 0 24 24';

  return (
    <svg className={cn('h-6 w-6', className)} aria-label={ariaLabel} viewBox={viewBox}>
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
};

export default Icon;
