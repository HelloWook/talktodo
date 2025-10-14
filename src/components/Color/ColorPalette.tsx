import React from 'react';

import ColorSwatch from './ColorSwatch';

interface ColorPaletteProps {
  colors: string[];
  title?: string;
  showValues?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({ colors, title, showValues = true, size = 'md', className }) => {
  return (
    <div className={className}>
      {title && <h3 className='mb-4 text-lg font-semibold text-gray-900'>{title}</h3>}
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
        {colors.map((color) => (
          <ColorSwatch key={color} color={color} showValues={showValues} size={size} />
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
