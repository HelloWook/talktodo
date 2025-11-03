export type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type FontSize = 'count' | 'title1' | 'title2' | 'title3' | 'body1' | 'body2' | 'body3' | 'caption' | 'date-large' | 'date-small';
export type LineHeight = 'tight' | 'normal' | 'loose' | 'auto';

export interface TypographyVariant {
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
}

export const typographyVariants: Record<string, TypographyVariant> = {
  // Count
  'count-bold': {
    fontSize: '40px',
    fontWeight: 700,
    lineHeight: 'auto',
  },

  // Title1
  'title1-bold': {
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: 'auto',
  },
  'title1-semibold': {
    fontSize: '32px',
    fontWeight: 600,
    lineHeight: 'auto',
  },

  // Title2
  'title2-bold': {
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: 'auto',
  },
  'title2-semibold': {
    fontSize: '28px',
    fontWeight: 600,
    lineHeight: 'auto',
  },

  // Title3
  'title3-bold': {
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: 'auto',
  },
  'title3-semibold': {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: 'auto',
  },

  // Body1
  'body1-bold': {
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: 'auto',
  },
  'body1-semibold': {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: 'auto',
  },
  'body1-medium': {
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: 'auto',
  },
  'body1-regular': {
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: 'auto',
  },

  // Body2
  'body2-bold': {
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: 'auto',
  },
  'body2-semibold': {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 'auto',
  },
  'body2-medium-tight': {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '1.2',
  },
  'body2-medium-loose': {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '1.6',
  },
  'body2-regular': {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 'auto',
  },

  // Body3
  'body3-bold': {
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: 'auto',
  },
  'body3-semibold': {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 'auto',
  },
  'body3-medium-tight': {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '1.2',
  },
  'body3-medium-loose': {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '1.6',
  },
  'body3-regular': {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 'auto',
  },

  // Caption
  'caption-bold': {
    fontSize: '12px',
    fontWeight: 700,
    lineHeight: 'auto',
  },
  'caption-semibold': {
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: 'auto',
  },
  'caption-medium': {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: 'auto',
  },
  'caption-regular': {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 'auto',
  },

  // Date
  'date-large': {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: 'auto',
  },
  'date-small': {
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: 'auto',
  },
};

export type TypographyVariantKey = keyof typeof typographyVariants;

/**
 * Typography utility function
 * @param variant - 타이포그래피 변형 키
 * @returns CSS 스타일 객체
 */
export function getTypographyStyles(variant: TypographyVariantKey) {
  return typographyVariants[variant];
}

/**
 * Typography component props
 */
export interface TypographyProps {
  variant: TypographyVariantKey;
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  htmlFor?: string;
  id?: string;
}
