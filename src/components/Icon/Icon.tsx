import { cn } from '@/utils/cn';

interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: string;
}

const Icon = ({ name, ...props }: IconProps) => {
  return (
    <svg className={cn('h-6 w-6')} aria-label={name} {...props}>
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
};

export default Icon;
