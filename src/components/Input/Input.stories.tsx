import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    onChange: { action: 'changed' },
    onFocus: { action: 'focused' },
    onBlur: { action: 'blurred' },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Playground: Story = {
  args: {
    placeholder: '입력하세요',
    disabled: false,
    type: 'text',
  },
};

export const States: Story = {
  render: (args) => (
    <div className='flex w-full max-w-md flex-col gap-4'>
      <div>
        <label htmlFor='normal-input' className='mb-2 block text-sm font-medium'>
          Normal
        </label>
        <Input {...args} id='normal-input' placeholder='일반 상태' />
      </div>
      <div>
        <label htmlFor='disabled-input' className='mb-2 block text-sm font-medium'>
          Disabled
        </label>
        <Input {...args} id='disabled-input' placeholder='비활성화 상태' disabled />
      </div>
    </div>
  ),
  args: {
    type: 'text',
  },
};

export const Types: Story = {
  render: (args) => (
    <div className='flex w-full max-w-md flex-col gap-4'>
      <div>
        <label htmlFor='text-input' className='mb-2 block text-sm font-medium'>
          Text
        </label>
        <Input {...args} id='text-input' type='text' placeholder='텍스트 입력' />
      </div>
      <div>
        <label htmlFor='email-input' className='mb-2 block text-sm font-medium'>
          Email
        </label>
        <Input {...args} id='email-input' type='email' placeholder='이메일 입력' />
      </div>
      <div>
        <label htmlFor='password-input' className='mb-2 block text-sm font-medium'>
          Password
        </label>
        <Input {...args} id='password-input' type='password' placeholder='비밀번호 입력' />
      </div>
      <div>
        <label htmlFor='number-input' className='mb-2 block text-sm font-medium'>
          Number
        </label>
        <Input {...args} id='number-input' type='number' placeholder='숫자 입력' />
      </div>
      <div>
        <label htmlFor='tel-input' className='mb-2 block text-sm font-medium'>
          Tel
        </label>
        <Input {...args} id='tel-input' type='tel' placeholder='전화번호 입력' />
      </div>
      <div>
        <label htmlFor='url-input' className='mb-2 block text-sm font-medium'>
          URL
        </label>
        <Input {...args} id='url-input' type='url' placeholder='URL 입력' />
      </div>
    </div>
  ),
};

export const WithValue: Story = {
  args: {
    placeholder: '기본값이 있는 입력',
    defaultValue: '기본값',
  },
};

export const WithCustomClass: Story = {
  args: {
    placeholder: '커스텀 스타일',
    className: 'border-2 border-blue-500',
  },
};
