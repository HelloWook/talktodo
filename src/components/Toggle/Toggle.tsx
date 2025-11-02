import { ReactNode, useState } from 'react';

import { cn } from '@/utils/cn';

type ToggleVariant = 'primary' | 'secondary';

const ICON_CLASSNAME = 'absolute flex items-center justify-center text-purple-400 transition-opacity duration-200';

interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  variant?: ToggleVariant;
  className?: string;
  thumbSize?: number;
  thumbTranslateX?: number;
  onChange?: (checked: boolean) => void;
  onChecked?: () => void;
  onUnchecked?: () => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  icons?: {
    left?: ReactNode;
    right?: ReactNode;
  };
}

const variantClasses = {
  primary: 'bg-primary',
  secondary: 'bg-purple-200',
} as const satisfies Record<ToggleVariant, string>;

const Toggle = ({
  checked,
  defaultChecked = false,
  variant = 'primary',
  className,
  thumbSize = 24,
  thumbTranslateX = 18,
  onChange,
  onChecked,
  onUnchecked,
  icons,
  ...props
}: ToggleProps) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleToggle = () => {
    const newChecked = !isChecked;

    if (checked === undefined) {
      setInternalChecked(newChecked);
    }

    onChange?.(newChecked);

    if (newChecked) {
      onChecked?.();
    } else {
      onUnchecked?.();
    }
  };

  return (
    <button
      type='button'
      role='switch'
      aria-checked={isChecked}
      onClick={handleToggle}
      className={cn(
        'relative inline-flex h-[28px] w-[48px] cursor-pointer items-center rounded-full border-transparent p-[3px] transition-all duration-200 ease-in-out focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {/* Left Icon */}
      {icons?.left && <div className={cn(ICON_CLASSNAME, 'left-1')}>{icons.left}</div>}

      {/* Thumb */}
      <span
        className='pointer-events-none z-10 inline-block transform rounded-full bg-white shadow-lg ring-0 transition-all duration-200 ease-in-out'
        style={{
          width: `${thumbSize}px`,
          height: `${thumbSize}px`,
          transform: isChecked ? `translateX(${thumbTranslateX}px)` : 'translateX(0)',
        }}
      />

      {/* Right Icon */}
      {icons?.right && <div className={cn(ICON_CLASSNAME, 'right-1')}>{icons.right}</div>}
    </button>
  );
};

export default Toggle;
