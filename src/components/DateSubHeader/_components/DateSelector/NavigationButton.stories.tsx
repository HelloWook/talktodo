import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import NavigationButton from './NavigationButton';

const meta: Meta<typeof NavigationButton> = {
  title: 'Components/DateSubHeader/DateSelector/NavigationButton',
  component: NavigationButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['prev', 'next'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof NavigationButton>;

export const Previous: Story = {
  args: {
    direction: 'prev',
    onClick: () => console.log('Previous clicked'),
  },
};

export const Next: Story = {
  args: {
    direction: 'next',
    onClick: () => console.log('Next clicked'),
  },
};

export const Both: Story = {
  render: () => (
    <div className='inline-flex gap-4'>
      <NavigationButton direction='prev' onClick={() => console.log('Previous clicked')} />
      <NavigationButton direction='next' onClick={() => console.log('Next clicked')} />
    </div>
  ),
};
