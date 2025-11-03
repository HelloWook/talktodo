import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Icon from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: [
        'active',
        'alert',
        'all',
        'calendar',
        'chevron-down',
        'chevron-left',
        'chevron-right',
        'chevron-up',
        'close',
        'delete',
        'flag',
        'fold',
        'goal',
        'google',
        'hamburger',
        'home',
        'image',
        'kakao',
        'kebab',
        'layout1',
        'layout2',
        'logo',
        'memo',
        'mic',
        'naver',
        'plus',
        'profile',
        'send',
        'timeline',
        'title',
        'tooltip',
        'unfold',
      ],
    },
    className: {
      control: { type: 'text' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  args: {
    name: 'home',
  },
};

export const AllIcons: Story = {
  render: () => (
    <div className='grid grid-cols-6 gap-4 p-4'>
      {[
        'active',
        'alert',
        'all',
        'calendar',
        'chevron-down',
        'chevron-left',
        'chevron-right',
        'chevron-up',
        'close',
        'delete',
        'flag',
        'fold',
        'goal',
        'google',
        'hamburger',
        'home',
        'image',
        'kakao',
        'kebab',
        'layout1',
        'layout2',
        'logo',
        'memo',
        'mic',
        'naver',
        'plus',
        'profile',
        'send',
        'timeline',
        'title',
        'tooltip',
        'unfold',
      ].map((iconName) => (
        <div key={iconName} className='flex flex-col items-center gap-2 p-2'>
          <Icon name={iconName} />
          <span className='text-xs text-gray-600'>{iconName}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <div className='flex flex-col items-center gap-2'>
        <Icon name='home' className='h-4 w-4' />
        <span className='text-xs'>Small (16px)</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Icon name='home' className='h-6 w-6' />
        <span className='text-xs'>Medium (24px)</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Icon name='home' className='h-8 w-8' />
        <span className='text-xs'>Large (32px)</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Icon name='home' className='h-12 w-12' />
        <span className='text-xs'>XLarge (48px)</span>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <div className='flex flex-col items-center gap-2'>
        <Icon name='home' className='h-8 w-8 text-gray-500' />
        <span className='text-xs'>Gray</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Icon name='home' className='h-8 w-8 text-blue-500' />
        <span className='text-xs'>Blue</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Icon name='home' className='h-8 w-8 text-purple-500' />
        <span className='text-xs'>Purple</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Icon name='home' className='h-8 w-8 text-red-500' />
        <span className='text-xs'>Red</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Icon name='home' className='h-8 w-8 text-green-500' />
        <span className='text-xs'>Green</span>
      </div>
    </div>
  ),
};

export const NavigationIcons: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Icon name='home' />
      <Icon name='calendar' />
      <Icon name='timeline' />
      <Icon name='profile' />
    </div>
  ),
};

export const ActionIcons: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Icon name='plus' aria-label='추가' />
      <Icon name='delete' aria-label='삭제' />
      <Icon name='close' aria-label='닫기' />
      <Icon name='send' aria-label='전송' />
    </div>
  ),
};

export const SocialIcons: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Icon name='google' aria-label='구글' />
      <Icon name='kakao' aria-label='카카오' />
      <Icon name='naver' aria-label='네이버' />
    </div>
  ),
};
