import React from 'react';

import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  disabled?: boolean;
}

const Input = ({ className, disabled, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        'font-body2-regular h-[44px] w-full rounded-2xl border border-gray-300 bg-white px-4 py-[12.5px] focus:bg-purple-500',
        disabled && 'border border-gray-200 bg-gray-100 text-gray-400',
        className,
      )}
      disabled={disabled}
      {...props}
    />
  );
};

export default Input;
