import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import SelectPriorty from './SelectPriorty';

const meta: Meta<typeof SelectPriorty> = {
  component: SelectPriorty,
  title: 'Components/SelectPriority',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onChange: {
      action: 'changed',
      description: '우선순위가 변경될 때 호출되는 콜백 함수',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스명',
    },
  },
};
export default meta;

type Story = StoryObj<typeof SelectPriorty>;

export const Default: Story = {
  args: {},
};

export const WithCustomClassName: Story = {
  args: {
    className: 'w-48',
  },
};

export const Interactive: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '드롭다운을 클릭하여 우선순위를 선택할 수 있습니다. 각 옵션은 색상으로 구분됩니다.',
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div className='space-y-4'>
      <div>
        <h3 className='mb-2 text-sm font-medium'>기본 상태</h3>
        <SelectPriorty onChange={() => {}} />
      </div>
      <div>
        <h3 className='mb-2 text-sm font-medium'>커스텀 스타일</h3>
        <SelectPriorty onChange={() => {}} className='w-64' />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 상태의 SelectPriority 컴포넌트를 확인할 수 있습니다.',
      },
    },
  },
};
