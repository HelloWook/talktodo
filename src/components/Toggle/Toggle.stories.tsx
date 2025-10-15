import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Toggle from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    checked: {
      control: { type: 'boolean' },
    },

    onChange: { action: 'changed' },
    onChecked: { action: 'checked' },
    onUnchecked: { action: 'unchecked' },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    checked: false,
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className='flex gap-4'>
      {(['primary', 'secondary'] as const).map((variant) => (
        <div key={variant} className='flex flex-col items-center gap-2'>
          <Toggle {...args} variant={variant} />
          <span className='text-sm text-gray-600'>{variant}</span>
        </div>
      ))}
    </div>
  ),
  args: {
    size: 'medium',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className='flex items-center gap-4'>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <div key={size} className='flex flex-col items-center gap-2'>
          <Toggle {...args} size={size} />
          <span className='text-sm text-gray-600'>{size}</span>
        </div>
      ))}
    </div>
  ),
  args: {
    variant: 'primary',
  },
};

export const States: Story = {
  render: (args) => (
    <div className='flex gap-4'>
      <div className='flex flex-col items-center gap-2'>
        <Toggle {...args} checked={false} />
        <span className='text-sm text-gray-600'>Unchecked</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Toggle {...args} checked={true} />
        <span className='text-sm text-gray-600'>Checked</span>
      </div>
    </div>
  ),
  args: {
    variant: 'primary',
    size: 'medium',
  },
};
