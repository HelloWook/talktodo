/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // 기존 디자인 시스템 색상 유지
        white: 'var(--color-white)',
        purple: {
          50: 'var(--color-purple-50)',
          100: 'var(--color-purple-100)',
          150: 'var(--color-purple-150)',
          200: 'var(--color-purple-200)',
          300: 'var(--color-purple-300)',
          400: 'var(--color-purple-400)',
          500: 'var(--color-purple-500)',
          600: 'var(--color-purple-600)',
          700: 'var(--color-purple-700)',
          800: 'var(--color-purple-800)',
          900: 'var(--color-purple-900)',
        },
        gray: {
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
        },
        // shadcn/ui 호환을 위한 기본 색상
        border: 'var(--color-border-primary)',
        input: 'var(--color-border-primary)',
        ring: 'var(--color-primary)',
        background: 'var(--color-bg-primary)',
        foreground: 'var(--color-text-primary)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-text-inverse)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-text-primary)',
        },
        destructive: {
          DEFAULT: 'var(--color-error)',
          foreground: 'var(--color-text-inverse)',
        },
        muted: {
          DEFAULT: 'var(--color-bg-secondary)',
          foreground: 'var(--color-text-secondary)',
        },
        accent: {
          DEFAULT: 'var(--color-bg-accent)',
          foreground: 'var(--color-text-accent)',
        },
        popover: {
          DEFAULT: 'var(--color-bg-primary)',
          foreground: 'var(--color-text-primary)',
        },
        card: {
          DEFAULT: 'var(--color-bg-primary)',
          foreground: 'var(--color-text-primary)',
        },
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // 기존 타이포그래피 시스템 유지
        count: ['40px', { lineHeight: 'auto', fontWeight: '700' }],
        title1: ['32px', { lineHeight: 'auto' }],
        title2: ['28px', { lineHeight: 'auto' }],
        title3: ['20px', { lineHeight: 'auto' }],
        body1: ['18px', { lineHeight: 'auto' }],
        body2: ['16px', { lineHeight: 'auto' }],
        body3: ['14px', { lineHeight: 'auto' }],
        caption: ['12px', { lineHeight: 'auto' }],
        'date-large': ['24px', { lineHeight: 'auto', fontWeight: '700' }],
        'date-small': ['20px', { lineHeight: 'auto', fontWeight: '700' }],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};
