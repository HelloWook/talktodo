import React from 'react';

import { cn } from '@/utils/cn';

import { TypographyProps, getTypographyStyles } from './typography.types';

/**
 * Typography Component
 * 폰트 디자인 시스템을 활용한 타이포그래피 컴포넌트
 */
export const Typography = ({ variant, children, className, as: Component = 'span', ...props }: TypographyProps) => {
  const styles = getTypographyStyles(variant);

  return React.createElement(
    Component,
    {
      className: cn(
        {
          'text-count': variant === 'count-bold',
          'text-title1-bold': variant === 'title1-bold',
          'text-title1-semibold': variant === 'title1-semibold',
          'text-title2-bold': variant === 'title2-bold',
          'text-title2-semibold': variant === 'title2-semibold',
          'text-title3-bold': variant === 'title3-bold',
          'text-title3-semibold': variant === 'title3-semibold',
          'text-body1-bold': variant === 'body1-bold',
          'text-body1-semibold': variant === 'body1-semibold',
          'text-body1-medium': variant === 'body1-medium',
          'text-body1-regular': variant === 'body1-regular',
          'text-body2-bold': variant === 'body2-bold',
          'text-body2-semibold': variant === 'body2-semibold',
          'text-body2-medium-tight': variant === 'body2-medium-tight',
          'text-body2-medium-loose': variant === 'body2-medium-loose',
          'text-body2-regular': variant === 'body2-regular',
          'text-body3-bold': variant === 'body3-bold',
          'text-body3-semibold': variant === 'body3-semibold',
          'text-body3-medium-tight': variant === 'body3-medium-tight',
          'text-body3-medium-loose': variant === 'body3-medium-loose',
          'text-body3-regular': variant === 'body3-regular',
          'text-caption-bold': variant === 'caption-bold',
          'text-caption-semibold': variant === 'caption-semibold',
          'text-caption-medium': variant === 'caption-medium',
          'text-caption-regular': variant === 'caption-regular',
          'text-date-large': variant === 'date-large',
          'text-date-small': variant === 'date-small',
        },
        className,
      ),
      style: {
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        lineHeight: styles.lineHeight,
        ...props,
      },
      ...props,
    },
    children,
  );
};

export default Typography;
