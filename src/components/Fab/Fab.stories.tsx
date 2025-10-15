import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Fab from './Fab';

const meta: Meta<typeof Fab> = {
  title: 'Components/Fab',
  component: Fab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'large'],
    },
    items: {
      control: { type: 'object' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Fab>;

export const Playground: Story = {
  args: {
    items: ['add', 'edit', 'delete'],
    size: 'large',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className='flex items-center gap-4'>
      {(['small', 'large'] as const).map((size) => (
        <div key={size} className='flex flex-col items-center gap-2'>
          <Fab {...args} size={size} />
          <span className='text-sm text-gray-600'>{size}</span>
        </div>
      ))}
    </div>
  ),
  args: {
    items: ['add', 'edit', 'delete'],
  },
};

export const WithDifferentItems: Story = {
  render: (args) => (
    <div className='flex gap-4'>
      <div className='flex flex-col items-center gap-2'>
        <Fab {...args} items={['add', 'edit']} />
        <span className='text-sm text-gray-600'>2 items</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Fab {...args} items={['add', 'edit', 'delete', 'share']} />
        <span className='text-sm text-gray-600'>4 items</span>
      </div>
    </div>
  ),
  args: {
    size: 'large',
  },
};
