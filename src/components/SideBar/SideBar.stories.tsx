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
    <SideBar>
      <SideBar.Content>
        <SideBar.Header />
      </SideBar.Content>
      <SideBar.Footer>
        <SideBar.ProfileSection userNickname='사용자' userEmail='user@example.com' />
      </SideBar.Footer>
    </SideBar>
  ),
};
