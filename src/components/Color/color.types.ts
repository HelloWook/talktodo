/**
 * Color System Types
 * 컬러 디자인 시스템의 타입 정의
 */

export type ColorScale = '50' | '100' | '150' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export type PurpleColor = `purple-${ColorScale}`;
export type GrayColor = `gray-${ColorScale}`;
export type WhiteColor = 'white';

export type BaseColor = PurpleColor | GrayColor | WhiteColor;

export type SemanticColor = 'primary' | 'primary-hover' | 'primary-light' | 'secondary' | 'secondary-hover' | 'secondary-light';

export type BackgroundColor = 'bg-primary' | 'bg-secondary' | 'bg-tertiary' | 'bg-accent';

export type TextColor = 'text-primary' | 'text-secondary' | 'text-tertiary' | 'text-inverse' | 'text-accent';

export type BorderColor = 'border-primary' | 'border-secondary' | 'border-accent';

export type StatusColor = 'success' | 'warning' | 'error' | 'info';

export type ColorVariant = BaseColor | SemanticColor | BackgroundColor | TextColor | BorderColor | StatusColor;

export interface ColorToken {
  hex: string;
  rgb: string;
  hsl: string;
  name: string;
}

export const colorTokens: Record<string, ColorToken> = {
  // White
  white: {
    hex: '#ffffff',
    rgb: 'rgb(255, 255, 255)',
    hsl: 'hsl(0, 0, 100)',
    name: 'White',
  },

  // Purple Scale
  'purple-50': {
    hex: '#f8f4fe',
    rgb: 'rgb(248, 244, 254)',
    hsl: 'hsl(264, 83, 98)',
    name: 'Purple 50',
  },
  'purple-100': {
    hex: '#f2eafe',
    rgb: 'rgb(242, 234, 254)',
    hsl: 'hsl(264, 91, 96)',
    name: 'Purple 100',
  },
  'purple-150': {
    hex: '#e5d6fc',
    rgb: 'rgb(229, 214, 252)',
    hsl: 'hsl(264, 86, 91)',
    name: 'Purple 150',
  },
  'purple-200': {
    hex: '#e0cdfc',
    rgb: 'rgb(224, 205, 252)',
    hsl: 'hsl(264, 89, 90)',
    name: 'Purple 200',
  },
  'purple-300': {
    hex: '#c8a5f9',
    rgb: 'rgb(200, 165, 249)',
    hsl: 'hsl(265, 88, 81)',
    name: 'Purple 300',
  },
  'purple-400': {
    hex: '#ae7bf6',
    rgb: 'rgb(174, 123, 246)',
    hsl: 'hsl(265, 87, 72)',
    name: 'Purple 400',
  },
  'purple-500': {
    hex: '#8f3fff',
    rgb: 'rgb(143, 63, 255)',
    hsl: 'hsl(265, 100, 62)',
    name: 'Purple 500',
  },
  'purple-600': {
    hex: '#7f2df1',
    rgb: 'rgb(127, 45, 241)',
    hsl: 'hsl(265, 87, 56)',
    name: 'Purple 600',
  },
  'purple-700': {
    hex: '#6c26cd',
    rgb: 'rgb(108, 38, 205)',
    hsl: 'hsl(265, 69, 48)',
    name: 'Purple 700',
  },
  'purple-800': {
    hex: '#481a89',
    rgb: 'rgb(72, 26, 137)',
    hsl: 'hsl(265, 68, 32)',
    name: 'Purple 800',
  },
  'purple-900': {
    hex: '#39146c',
    rgb: 'rgb(57, 20, 108)',
    hsl: 'hsl(265, 69, 25)',
    name: 'Purple 900',
  },

  // Gray Scale
  'gray-100': {
    hex: '#f5f5f5',
    rgb: 'rgb(245, 245, 245)',
    hsl: 'hsl(0, 0, 96)',
    name: 'Gray 100',
  },
  'gray-200': {
    hex: '#e9e8ec',
    rgb: 'rgb(233, 232, 236)',
    hsl: 'hsl(255, 10, 92)',
    name: 'Gray 200',
  },
  'gray-300': {
    hex: '#d5d3da',
    rgb: 'rgb(213, 211, 218)',
    hsl: 'hsl(257, 9, 84)',
    name: 'Gray 300',
  },
  'gray-400': {
    hex: '#bbb8c3',
    rgb: 'rgb(187, 184, 195)',
    hsl: 'hsl(256, 8, 74)',
    name: 'Gray 400',
  },
  'gray-500': {
    hex: '#8f8b99',
    rgb: 'rgb(143, 139, 153)',
    hsl: 'hsl(257, 6, 57)',
    name: 'Gray 500',
  },
  'gray-600': {
    hex: '#6f6a78',
    rgb: 'rgb(111, 106, 120)',
    hsl: 'hsl(261, 6, 44)',
    name: 'Gray 600',
  },
  'gray-700': {
    hex: '#534e59',
    rgb: 'rgb(83, 78, 89)',
    hsl: 'hsl(267, 7, 33)',
    name: 'Gray 700',
  },
  'gray-800': {
    hex: '#3c373f',
    rgb: 'rgb(60, 55, 63)',
    hsl: 'hsl(278, 7, 23)',
    name: 'Gray 800',
  },
  'gray-900': {
    hex: '#29252b',
    rgb: 'rgb(41, 37, 43)',
    hsl: 'hsl(280, 8, 16)',
    name: 'Gray 900',
  },
};

export const semanticColors: Record<SemanticColor, string> = {
  primary: 'var(--color-primary)',
  'primary-hover': 'var(--color-primary-hover)',
  'primary-light': 'var(--color-primary-light)',
  secondary: 'var(--color-secondary)',
  'secondary-hover': 'var(--color-secondary-hover)',
  'secondary-light': 'var(--color-secondary-light)',
};

export const statusColors: Record<StatusColor, string> = {
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-error)',
  info: 'var(--color-info)',
};

/**
 * Color utility function
 * @param color - 컬러 토큰 키
 * @returns 컬러 토큰 정보
 */
export function getColorToken(color: string): ColorToken | undefined {
  return colorTokens[color];
}

/**
 * Color component props
 */
export interface ColorProps {
  color: ColorVariant;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
