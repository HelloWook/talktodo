import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useRef } from 'react';

import UserForm from './UserForm';

const meta: Meta<typeof UserForm> = {
  title: 'Components/UserForm',
  component: UserForm,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'gray',
      values: [
        { name: 'gray', value: '#f5f5f5' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
};

export default meta;

type Story = StoryObj<typeof UserForm>;

export const Default: Story = {
  render: (args) => {
    const imageRef = useRef<HTMLInputElement>(null);

    return (
      <UserForm {...args}>
        <UserForm.Title title='회원가입' />
        <UserForm.FieldGroup fieldName='이메일' type='email' placeholder='이메일을 입력하세요' />
        <UserForm.FieldGroup fieldName='비밀번호' type='password' placeholder='비밀번호를 입력하세요' />
        <UserForm.FormButton>가입하기</UserForm.FormButton>
      </UserForm>
    );
  },
  args: {
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();
    },
  },
};

export const LoginForm: Story = {
  render: (args) => {
    return (
      <UserForm {...args}>
        <UserForm.Title title='로그인' />
        <UserForm.FieldGroup fieldName='이메일' type='email' placeholder='이메일을 입력하세요' />
        <UserForm.FieldGroup fieldName='비밀번호' type='password' placeholder='비밀번호를 입력하세요' />
        <UserForm.FormButton>로그인</UserForm.FormButton>
      </UserForm>
    );
  },
  args: {
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();
    },
  },
};

export const WithProfileUpload: Story = {
  render: (args) => {
    const imageRef = useRef<HTMLInputElement>(null);

    return (
      <UserForm {...args}>
        <UserForm.Title title='프로필 수정' />
        <UserForm.FieldGroup fieldName='이름' type='text' placeholder='이름을 입력하세요'>
          <UserForm.UserProfileUpload imageRef={imageRef} />
        </UserForm.FieldGroup>
        <UserForm.FieldGroup fieldName='이메일' type='email' placeholder='이메일을 입력하세요' />
        <UserForm.FormButton>저장하기</UserForm.FormButton>
      </UserForm>
    );
  },
  args: {
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();
    },
  },
};

export const CompleteRegistrationForm: Story = {
  render: (args) => {
    const imageRef = useRef<HTMLInputElement>(null);

    return (
      <UserForm {...args}>
        <UserForm.Title title='회원 정보 입력' />
        <UserForm.FieldGroup fieldName='이름' type='text' placeholder='이름을 입력하세요'>
          <UserForm.UserProfileUpload imageRef={imageRef} />
        </UserForm.FieldGroup>
        <UserForm.FieldGroup fieldName='이메일' type='email' placeholder='example@email.com' />
        <UserForm.FieldGroup fieldName='비밀번호' type='password' placeholder='비밀번호를 입력하세요' />
        <UserForm.FieldGroup fieldName='비밀번호 확인' type='password' placeholder='비밀번호를 다시 입력하세요' />
        <UserForm.FormButton>회원가입 완료</UserForm.FormButton>
      </UserForm>
    );
  },
  args: {
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();
    },
  },
};

export const MinimalForm: Story = {
  render: (args) => {
    return (
      <UserForm {...args}>
        <UserForm.Title title='간단 로그인' />
        <UserForm.FieldGroup fieldName='이메일' type='email' placeholder='이메일' />
        <UserForm.FormButton>로그인</UserForm.FormButton>
      </UserForm>
    );
  },
  args: {
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();
    },
  },
};

export const WithDefaultValues: Story = {
  render: (args) => {
    return (
      <UserForm {...args}>
        <UserForm.Title title='정보 수정' />
        <UserForm.FieldGroup fieldName='이름' type='text' placeholder='이름' defaultValue='홍길동' />
        <UserForm.FieldGroup fieldName='이메일' type='email' placeholder='이메일' defaultValue='hong@example.com' />
        <UserForm.FieldGroup fieldName='전화번호' type='tel' placeholder='전화번호' defaultValue='010-1234-5678' />
        <UserForm.FormButton>수정 완료</UserForm.FormButton>
      </UserForm>
    );
  },
  args: {
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();
    },
  },
};

export const Playground: Story = {
  render: (args) => {
    const imageRef = useRef<HTMLInputElement>(null);

    return (
      <UserForm {...args}>
        <UserForm.Title title='폼 테스트' />
        <UserForm.FieldGroup fieldName='텍스트' type='text' placeholder='텍스트를 입력하세요'>
          <UserForm.UserProfileUpload imageRef={imageRef} />
        </UserForm.FieldGroup>
        <UserForm.FieldGroup fieldName='이메일' type='email' placeholder='이메일을 입력하세요' />
        <UserForm.FormButton>제출</UserForm.FormButton>
      </UserForm>
    );
  },
  args: {
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();
    },
  },
};
