import { ReactNode, ButtonHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'disabled';
type ButtonSize = 'small' | 'medium' | 'large';

const variantClasses = {
  primary: 'bg-primary hover:bg-purple-100 hover:!text-purple-500',
  secondary: 'bg-purple-700 hover:!bg-purple-200 hover:!text-purple-500',
  tertiary: 'bg-purple-800 hover:!bg-purple-300 hover:!text-purple-500',
  disabled: 'bg-gray-300 hover:!bg-gray-100 hover:!text-gray-400',
} as const satisfies Record<ButtonVariant, string>;

const sizeClasses = {
  small: 'h-[56px] rounded-[16px] ds-typo-body1-bold',
  medium: 'h-[50px]  rounded-[12px] ds-typo-body2-bold',
  large: 'h-[44px] rounded-[12px]',
} as const satisfies Record<ButtonSize, string>;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ children, variant = 'primary', size = 'medium', className, disabled = false, onClick, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={cn(
        'flex cursor-pointer items-center justify-center px-4 text-white',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      disabled={disabled}
      onClick={onClick ? () => onClick() : () => {}}
    >
      {children}
    </button>
  );
};

export default Button;
