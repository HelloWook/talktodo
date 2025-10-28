import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { useRef } from 'react';

import ProfileUpload from './ProfileUpload';

const meta: Meta<typeof ProfileUpload> = {
  title: 'Components/UserForm/ProfileUpload',
  component: ProfileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
    currentImageUrl: {
      control: 'text',
      description: '현재 이미지 URL',
    },
    onFileSelect: {
      action: 'fileSelected',
      description: '파일 선택 시 호출되는 콜백',
    },
    resetToOriginal: {
      control: 'boolean',
      description: '원본 이미지로 리셋하는 플래그',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileUpload>;

// 기본 스토리
export const Default: Story = {
  render: (args) => {
    const imageRef = useRef<HTMLInputElement>(null);

    return (
      <div className='p-8'>
        <ProfileUpload {...args} imageRef={imageRef} />
      </div>
    );
  },
  args: {
    currentImageUrl: '/img/Profile.png',
  },
};

// 기본 이미지가 없는 경우
export const NoImage: Story = {
  render: (args) => {
    const imageRef = useRef<HTMLInputElement>(null);

    return (
      <div className='p-8'>
        <ProfileUpload {...args} imageRef={imageRef} />
      </div>
    );
  },
  args: {
    currentImageUrl: undefined,
  },
};

// 커스텀 이미지가 있는 경우
export const WithCustomImage: Story = {
  render: (args) => {
    const imageRef = useRef<HTMLInputElement>(null);

    return (
      <div className='p-8'>
        <ProfileUpload {...args} imageRef={imageRef} />
      </div>
    );
  },
  args: {
    currentImageUrl: 'https://via.placeholder.com/140x140/4F46E5/FFFFFF?text=Profile',
  },
};

// 파일 선택 콜백이 있는 경우
export const WithFileSelectCallback: Story = {
  render: (args) => {
    const imageRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (file: File) => {
      console.log('선택된 파일:', file);
      alert(`파일이 선택되었습니다: ${file.name}`);
    };

    return (
      <div className='p-8'>
        <ProfileUpload {...args} imageRef={imageRef} onFileSelect={handleFileSelect} />
      </div>
    );
  },
  args: {
    currentImageUrl: '/img/Profile.png',
  },
};

// 리셋 기능이 있는 경우
export const WithReset: Story = {
  render: (args) => {
    const imageRef = useRef<HTMLInputElement>(null);

    return (
      <div className='p-8'>
        <ProfileUpload {...args} imageRef={imageRef} />
        <div className='mt-4 text-center'>
          <button
            onClick={() => {
              // 리셋 기능을 테스트하기 위한 버튼
              if (imageRef.current) {
                imageRef.current.value = '';
              }
            }}
            className='rounded bg-gray-200 px-4 py-2 hover:bg-gray-300'
          >
            파일 선택 리셋
          </button>
        </div>
      </div>
    );
  },
  args: {
    currentImageUrl: '/img/Profile.png',
  },
};

// 다양한 크기 테스트
export const DifferentSizes: Story = {
  render: (args) => {
    const imageRef = useRef<HTMLInputElement>(null);

    return (
      <div className='flex gap-8 p-8'>
        <div>
          <h3 className='mb-4 text-center'>기본 크기</h3>
          <ProfileUpload {...args} imageRef={imageRef} />
        </div>
        <div>
          <h3 className='mb-4 text-center'>작은 크기</h3>
          <ProfileUpload {...args} imageRef={imageRef} className='scale-75' />
        </div>
        <div>
          <h3 className='mb-4 text-center'>큰 크기</h3>
          <ProfileUpload {...args} imageRef={imageRef} className='scale-125' />
        </div>
      </div>
    );
  },
  args: {
    currentImageUrl: '/img/Profile.png',
  },
};
