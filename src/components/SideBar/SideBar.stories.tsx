import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import SideBar from './SideBar';

const meta: Meta<typeof SideBar> = {
  title: 'Components/SideBar',
  component: SideBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '사이드바 컴포넌트입니다. 네비게이션 메뉴를 표시하는 데 사용됩니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof SideBar>;

export const Default: Story = {
  render: () => (
    <div className='flex'>
      <SideBar
        onFoldToggle={() => {}}
        userNickname='사용자'
        userEmail='user@example.com'
        goals={['목표 1', '목표 2', '목표 3', '목표 4', '목표 5', '목표 6', '목표 7', '목표 8', '목표 9', '목표 10']}
      />
      <div className='flex-1 p-6'>
        <h1 className='text-2xl font-bold'>SideBar 컴포넌트</h1>
        <p className='mt-4 text-gray-600'>컴파운드 패턴으로 리팩토링된 SideBar 컴포넌트입니다.</p>
      </div>
    </div>
  ),
};

export const Folded: Story = {
  render: () => (
    <div className='flex'>
      <SideBar onFoldToggle={() => {}} userNickname='사용자' userEmail='user@example.com' goals={['목표 1', '목표 2', '목표 3']} />
      <div className='flex-1 p-6'>
        <h1 className='text-2xl font-bold'>접힌 SideBar</h1>
        <p className='mt-4 text-gray-600'>접힌 상태의 SideBar 컴포넌트입니다.</p>
      </div>
    </div>
  ),
};
