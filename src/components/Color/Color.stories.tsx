import { Meta, StoryObj } from '@storybook/nextjs-vite';

import ColorPalette from './ColorPalette';
import ColorSwatch from './ColorSwatch';

const meta: Meta<typeof ColorSwatch> = {
  title: 'Design System/Color',
  component: ColorSwatch,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '컬러 디자인 시스템의 컬러 팔레트와 스와치 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: [
        'white',
        'purple-50',
        'purple-100',
        'purple-150',
        'purple-200',
        'purple-300',
        'purple-400',
        'purple-500',
        'purple-600',
        'purple-700',
        'purple-800',
        'purple-900',
        'gray-100',
        'gray-200',
        'gray-300',
        'gray-400',
        'gray-500',
        'gray-600',
        'gray-700',
        'gray-800',
        'gray-900',
      ],
      description: '컬러 토큰',
    },
    showValues: {
      control: 'boolean',
      description: '컬러 값 표시 여부',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '스와치 크기',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    color: 'purple-600',
    showValues: true,
    size: 'md',
  },
};

// Purple 팔레트
export const PurplePalette: Story = {
  render: () => (
    <ColorPalette
      title='Purple Scale'
      colors={[
        'purple-50',
        'purple-100',
        'purple-150',
        'purple-200',
        'purple-300',
        'purple-400',
        'purple-500',
        'purple-600',
        'purple-700',
        'purple-800',
        'purple-900',
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Purple 컬러 스케일의 모든 변형을 보여줍니다.',
      },
    },
  },
};

// Gray 팔레트
export const GrayPalette: Story = {
  render: () => (
    <ColorPalette
      title='Gray Scale'
      colors={['gray-100', 'gray-200', 'gray-300', 'gray-400', 'gray-500', 'gray-600', 'gray-700', 'gray-800', 'gray-900']}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Gray 컬러 스케일의 모든 변형을 보여줍니다.',
      },
    },
  },
};

// White
export const White: Story = {
  render: () => <ColorPalette title='White' colors={['white']} />,
  parameters: {
    docs: {
      description: {
        story: 'White 컬러를 보여줍니다.',
      },
    },
  },
};

// 모든 컬러
export const AllColors: Story = {
  render: () => (
    <div className='space-y-8'>
      <ColorPalette
        title='Purple Scale'
        colors={[
          'purple-50',
          'purple-100',
          'purple-150',
          'purple-200',
          'purple-300',
          'purple-400',
          'purple-500',
          'purple-600',
          'purple-700',
          'purple-800',
          'purple-900',
        ]}
      />
      <ColorPalette
        title='Gray Scale'
        colors={['gray-100', 'gray-200', 'gray-300', 'gray-400', 'gray-500', 'gray-600', 'gray-700', 'gray-800', 'gray-900']}
      />
      <ColorPalette title='White' colors={['white']} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 컬러 팔레트를 한 번에 볼 수 있습니다.',
      },
    },
  },
};

// 크기 비교
export const SizeComparison: Story = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <h3 className='mb-4 text-lg font-semibold text-gray-900'>Small</h3>
        <div className='flex space-x-4'>
          <ColorSwatch color='purple-600' size='sm' />
          <ColorSwatch color='purple-500' size='sm' />
          <ColorSwatch color='purple-400' size='sm' />
        </div>
      </div>
      <div>
        <h3 className='mb-4 text-lg font-semibold text-gray-900'>Medium</h3>
        <div className='flex space-x-4'>
          <ColorSwatch color='purple-600' size='md' />
          <ColorSwatch color='purple-500' size='md' />
          <ColorSwatch color='purple-400' size='md' />
        </div>
      </div>
      <div>
        <h3 className='mb-4 text-lg font-semibold text-gray-900'>Large</h3>
        <div className='flex space-x-4'>
          <ColorSwatch color='purple-600' size='lg' />
          <ColorSwatch color='purple-500' size='lg' />
          <ColorSwatch color='purple-400' size='lg' />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 컬러 스와치를 비교할 수 있습니다.',
      },
    },
  },
};

// 값 표시 여부 비교
export const ValueDisplayComparison: Story = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <h3 className='mb-4 text-lg font-semibold text-gray-900'>값 표시</h3>
        <div className='flex space-x-4'>
          <ColorSwatch color='purple-600' showValues={true} />
          <ColorSwatch color='purple-500' showValues={true} />
          <ColorSwatch color='purple-400' showValues={true} />
        </div>
      </div>
      <div>
        <h3 className='mb-4 text-lg font-semibold text-gray-900'>값 숨김</h3>
        <div className='flex space-x-4'>
          <ColorSwatch color='purple-600' showValues={false} />
          <ColorSwatch color='purple-500' showValues={false} />
          <ColorSwatch color='purple-400' showValues={false} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '컬러 값 표시 여부를 비교할 수 있습니다.',
      },
    },
  },
};
