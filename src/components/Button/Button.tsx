import { ReactNode, ButtonHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'small' | 'medium' | 'large';

const variantClasses = {
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-white',
  tertiary: 'bg-tertiary text-white',
} as const satisfies Record<ButtonVariant, string>;

const sizeClasses = {
  small: 'h-[56px] rounded-[16px]',
  medium: 'h-[50px]  rounded-[12px]',
  large: 'h-[44px] rounded-[12px]',
} as const satisfies Record<ButtonSize, string>;

const baseStyle = 'flex items-center justify-center cursor-pointer px-4';

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
      className={cn(baseStyle, variantClasses[variant], sizeClasses[size], className)}
      disabled={disabled}
      onClick={onClick ? () => onClick() : () => {}}
    >
      {children}
    </button>
  );
};

export default Button;
