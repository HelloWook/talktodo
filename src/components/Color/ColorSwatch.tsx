import React from 'react';

import { cn } from '@/utils/cn';

import { getColorToken } from './color.types';

interface ColorSwatchProps {
  color: string;
  showValues?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, showValues = true, size = 'md', className }) => {
  const colorToken = getColorToken(color);

  if (!colorToken) {
    return null;
  }

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  return (
    <div className={cn('flex flex-col items-center space-y-2', className)}>
      <div
        className={cn('rounded-lg border border-gray-200 shadow-sm', sizeClasses[size])}
        style={{ backgroundColor: colorToken.hex }}
        title={`${colorToken.name} - ${colorToken.hex}`}
      />
      {showValues && (
        <div className='space-y-1 text-center'>
          <div className='text-sm font-medium text-gray-900'>{colorToken.name}</div>
          <div className='font-mono text-xs text-gray-600'>{colorToken.hex}</div>
          <div className='font-mono text-xs text-gray-500'>{colorToken.rgb}</div>
          <div className='font-mono text-xs text-gray-500'>{colorToken.hsl}</div>
        </div>
      )}
    </div>
  );
};

export default ColorSwatch;
