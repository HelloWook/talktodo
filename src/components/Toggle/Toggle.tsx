import { ReactNode, useState } from 'react';

import { cn } from '@/utils/cn';

type ToggleVariant = 'primary' | 'secondary';
type ToggleSize = 'small' | 'medium' | 'large';

interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;

  variant?: ToggleVariant;
  size?: ToggleSize;
  className?: string;
  onChange?: (checked: boolean) => void;
  onChecked?: () => void;
  onUnchecked?: () => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  children?: {
    checked?: ReactNode;
    unchecked?: ReactNode;
  };
}

const variantClasses = {
  primary: 'bg-primary',
  secondary: 'bg-purple-200',
} as const satisfies Record<ToggleVariant, string>;

const sizeClasses = {
  small: 'h-[24px] w-[41px]',
  medium: 'h-[28px] w-[48px]',
  large: 'h-[36px] w-[63px]',
} as const satisfies Record<ToggleSize, string>;

const thumbSizeClasses = {
  small: 'h-[20px] w-[20px]',
  medium: 'h-[24px] w-[24px]',
  large: 'h-[30px] w-[30px]',
} as const satisfies Record<ToggleSize, string>;

const iconSizeClasses = {
  small: 'h-3 w-3',
  medium: 'h-4 w-4',
  large: 'h-5 w-5',
} as const satisfies Record<ToggleSize, string>;

const thumbTranslateXClasses = {
  small: 'translate-x-[15px]',
  medium: 'translate-x-[18px]',
  large: 'translate-x-[28px]',
} as const satisfies Record<ToggleSize, string>;

const Toggle = ({
  checked,
  defaultChecked = false,

  variant = 'primary',
  size = 'medium',
  className,
  onChange,
  onChecked,
  onUnchecked,
  children,
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
        'relative inline-flex items-center rounded-full border-transparent p-[3px] transition-all duration-200 ease-in-out focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {/* Unchecked Icon */}
      {children?.unchecked && (
        <div
          className={cn(
            'absolute left-1 flex items-center justify-center text-gray-500 transition-opacity duration-200',
            iconSizeClasses[size],
            isChecked ? 'opacity-0' : 'opacity-100',
          )}
        >
          {children.unchecked}
        </div>
      )}

      {/* Thumb */}
      <span
        className={cn(
          'pointer-events-none inline-block transform rounded-full bg-white shadow-lg ring-0 transition-all duration-200 ease-in-out',
          thumbSizeClasses[size],
          isChecked ? thumbTranslateXClasses[size] : 'translate-x-0',
        )}
      >
        {/* checked Icon */}
        {children?.checked && (
          <div
            className={cn(
              'flex items-center justify-center text-white transition-opacity duration-200',
              iconSizeClasses[size],
              isChecked ? 'opacity-100' : 'opacity-0',
            )}
          >
            {children.checked}
          </div>
        )}
      </span>

      {/* Checked Icon */}
      {children?.checked && !children?.unchecked && (
        <div
          className={cn(
            'absolute right-1 flex items-center justify-center text-white transition-opacity duration-200',
            iconSizeClasses[size],
            isChecked ? 'opacity-100' : 'opacity-0',
          )}
        >
          {children.checked}
        </div>
      )}
    </button>
  );
};

export default Toggle;
