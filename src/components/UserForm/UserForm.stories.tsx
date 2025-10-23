import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import UserForm from './UserForm';

const meta: Meta<typeof UserForm> = {
  title: 'Components/UserForm',
  component: UserForm,
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
    onSubmit: { action: 'submitted' },
  },
};

export default meta;

type Story = StoryObj<typeof UserForm>;

export const Default: Story = {
  render: (args) => (
    <UserForm {...args}>
      <UserForm.Title title='마이 페이지' />
      <UserForm.ProfileUpload />
      <UserForm.FieldGroup fieldName='이름' placeholder='이름을 입력하세요' />
      <UserForm.FieldGroup fieldName='이메일' placeholder='이메일을 입력하세요' />
      <UserForm.FormButton>로그인</UserForm.FormButton>
    </UserForm>
  ),
};

export const WithCustomTitle: Story = {
  render: (args) => (
    <UserForm {...args}>
      <UserForm.Title title='회원가입' />
      <UserForm.ProfileUpload />
      <UserForm.FieldGroup fieldName='이름' placeholder='이름을 입력하세요' />
      <UserForm.FieldGroup fieldName='이메일' placeholder='이메일을 입력하세요' />
      <UserForm.FieldGroup fieldName='비밀번호' placeholder='비밀번호를 입력하세요' type='password' />
      <UserForm.FormButton>회원가입</UserForm.FormButton>
    </UserForm>
  ),
};

export const LoginForm: Story = {
  render: (args) => (
    <UserForm {...args}>
      <UserForm.Title title='로그인' />
      <UserForm.FieldGroup fieldName='이메일' placeholder='이메일을 입력하세요' />
      <UserForm.FieldGroup fieldName='비밀번호' placeholder='비밀번호를 입력하세요' type='password' />
      <UserForm.FormButton>로그인</UserForm.FormButton>
    </UserForm>
  ),
};

export const ProfileEdit: Story = {
  render: (args) => (
    <UserForm {...args}>
      <UserForm.Title title='프로필 수정' />
      <UserForm.ProfileUpload />
      <UserForm.FieldGroup fieldName='이름' placeholder='이름을 입력하세요' defaultValue='홍길동' />
      <UserForm.FieldGroup fieldName='이메일' placeholder='이메일을 입력하세요' defaultValue='hong@example.com' />
      <UserForm.FieldGroup fieldName='전화번호' placeholder='전화번호를 입력하세요' />
      <UserForm.FormButton>저장</UserForm.FormButton>
    </UserForm>
  ),
};

export const WithDisabledFields: Story = {
  render: (args) => (
    <UserForm {...args}>
      <UserForm.Title title='회원 정보' />
      <UserForm.ProfileUpload />
      <UserForm.FieldGroup fieldName='이름' placeholder='이름을 입력하세요' disabled />
      <UserForm.FieldGroup fieldName='이메일' placeholder='이메일을 입력하세요' disabled />
      <UserForm.FormButton>수정하기</UserForm.FormButton>
    </UserForm>
  ),
};

export const Components: Story = {
  render: () => (
    <div className='space-y-8'>
      <div>
        <h3 className='mb-4 text-lg font-semibold'>Title Component</h3>
        <UserForm.Title title='제목 예시' />
      </div>

      <div>
        <h3 className='mb-4 text-lg font-semibold'>FieldGroup Component</h3>
        <UserForm.FieldGroup fieldName='테스트 필드' placeholder='입력하세요' />
      </div>

      <div>
        <h3 className='mb-4 text-lg font-semibold'>FormButton Component</h3>
        <UserForm.FormButton>버튼 예시</UserForm.FormButton>
      </div>

      <div>
        <h3 className='mb-4 text-lg font-semibold'>ProfileUpload Component</h3>
        <UserForm.ProfileUpload />
      </div>
    </div>
  ),
};
