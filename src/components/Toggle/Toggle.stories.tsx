import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Toggle from './Toggle';
import Icon from '../Icon/Icon';

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
      options: ['primary', 'secondary'],
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
};

export const WithIcons: Story = {
  render: (args) => (
    <div className='flex gap-4'>
      <div className='flex flex-col items-center gap-2'>
        <Toggle
          {...args}
          checked={false}
          icons={{
            left: <Icon name='calendar' />,
            right: <Icon name='timeline' />,
          }}
        />
        <span className='text-sm text-gray-600'>Left Selected</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Toggle
          {...args}
          checked={true}
          icons={{
            left: <Icon name='calendar' />,
            right: <Icon name='timeline' />,
          }}
        />
        <span className='text-sm text-gray-600'>Right Selected</span>
      </div>
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
        <span className='text-sm text-gray-600'>Left (Unchecked)</span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Toggle {...args} checked={true} />
        <span className='text-sm text-gray-600'>Right (Checked)</span>
      </div>
    </div>
  ),
  args: {
    variant: 'primary',
  },
};
