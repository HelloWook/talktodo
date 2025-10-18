import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
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
    disabled: {
      control: { type: 'boolean' },
    },
    onClick: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'medium',
    disabled: false,
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className='flex gap-3'>
      {(['primary', 'secondary', 'tertiary', 'disabled', 'kakao', 'naver', 'google'] as const).map((variant) => (
        <Button key={variant} {...args} variant={variant} className='w-[320px]' onClick={() => {}}>
          {variant}
        </Button>
      ))}
    </div>
  ),
  args: {
    size: 'medium',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className='flex items-end gap-3'>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Button key={size} {...args} size={size} onClick={() => {}}>
          {size}
        </Button>
      ))}
    </div>
  ),
  args: {
    variant: 'primary',
  },
};
