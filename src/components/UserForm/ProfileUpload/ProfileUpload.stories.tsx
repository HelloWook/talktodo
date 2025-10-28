import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useRef, useState } from 'react';

import ProfileUpload, { ProfileUploadProps } from './ProfileUpload';

const meta: Meta<typeof ProfileUpload> = {
  title: 'Components/ProfileUpload',
  component: ProfileUpload,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onFileSelect: { action: 'file selected' },
  },
};

export default meta;

type Story = StoryObj<typeof ProfileUpload>;

// Wrapper component for stories that need ref
const ProfileUploadWrapper = (args: Partial<ProfileUploadProps>) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(args.currentImageUrl);

  const handleFileSelect = (file: File) => {
    args.onFileSelect?.(file);
    // Create a preview URL for the story
    const url = URL.createObjectURL(file);
    setCurrentImageUrl(url);
  };

  return <ProfileUpload {...args} imageRef={imageRef} currentImageUrl={currentImageUrl} onFileSelect={handleFileSelect} />;
};

export const Default: Story = {
  render: (args) => <ProfileUploadWrapper {...args} />,
  args: {
    currentImageUrl: '/img/Profile.png',
  },
};

export const WithCustomImage: Story = {
  render: (args) => <ProfileUploadWrapper {...args} />,
  args: {
    currentImageUrl: 'https://via.placeholder.com/140x140/4F46E5/FFFFFF?text=Profile',
  },
};

export const WithReset: Story = {
  render: (args) => {
    const imageRef = useRef<HTMLInputElement>(null);
    const [resetToOriginal, setResetToOriginal] = useState(false);

    return (
      <div className='space-y-4'>
        <ProfileUpload {...args} imageRef={imageRef} resetToOriginal={resetToOriginal} />
        <button onClick={() => setResetToOriginal(!resetToOriginal)} className='rounded bg-blue-500 px-4 py-2 text-white'>
          {resetToOriginal ? 'Reset Applied' : 'Reset to Original'}
        </button>
      </div>
    );
  },
  args: {
    currentImageUrl: 'https://via.placeholder.com/140x140/10B981/FFFFFF?text=Custom',
  },
};

export const Interactive: Story = {
  render: (args) => {
    const imageRef = useRef<HTMLInputElement>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState(args.currentImageUrl);
    const [fileHistory, setFileHistory] = useState<string[]>([]);

    const handleFileSelect = (file: File) => {
      args.onFileSelect?.(file);
      const url = URL.createObjectURL(file);
      setCurrentImageUrl(url);
      setFileHistory((prev) => [...prev, file.name]);
    };

    return (
      <div className='space-y-4'>
        <ProfileUpload {...args} imageRef={imageRef} currentImageUrl={currentImageUrl} onFileSelect={handleFileSelect} />
        {fileHistory.length > 0 && (
          <div className='text-sm text-gray-600'>
            <p>선택된 파일들:</p>
            <ul className='list-inside list-disc'>
              {fileHistory.map((fileName, index) => (
                <li key={index}>{fileName}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
  args: {
    currentImageUrl: '/img/Profile.png',
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className='flex items-center gap-8'>
      <div className='text-center'>
        <ProfileUploadWrapper currentImageUrl='/img/Profile.png' />
        <p className='mt-2 text-sm text-gray-600'>기본 크기</p>
      </div>
      <div className='text-center'>
        <ProfileUploadWrapper currentImageUrl='/img/Profile.png' className='scale-75' />
        <p className='mt-2 text-sm text-gray-600'>75% 크기</p>
      </div>
      <div className='text-center'>
        <ProfileUploadWrapper currentImageUrl='/img/Profile.png' className='scale-50' />
        <p className='mt-2 text-sm text-gray-600'>50% 크기</p>
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className='space-y-8'>
      <div>
        <h3 className='mb-4 text-lg font-semibold'>기본 상태</h3>
        <ProfileUploadWrapper currentImageUrl='/img/Profile.png' />
      </div>

      <div>
        <h3 className='mb-4 text-lg font-semibold'>커스텀 이미지</h3>
        <ProfileUploadWrapper currentImageUrl='https://via.placeholder.com/140x140/EF4444/FFFFFF?text=Custom' />
      </div>

      <div>
        <h3 className='mb-4 text-lg font-semibold'>다크 배경에서</h3>
        <div className='rounded-lg bg-gray-800 p-8'>
          <ProfileUploadWrapper currentImageUrl='/img/Profile.png' />
        </div>
      </div>
    </div>
  ),
};
