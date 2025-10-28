'use client';
import Image from 'next/image';

import Button from '../Button/Button';
import Input from '../Input/Input';
import Typography from '../Typography/Typography';
interface UserFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

const UserForm = ({ children, ...props }: UserFormProps) => {
  return (
    <form
      {...props}
      className='h-[613px] w-[90%] max-w-[640px] rounded-[28px] bg-[var(--color-white)] pt-[56px] pr-[32px] pb-[40px] pl-[32px]'
    >
      {children}
    </form>
  );
};

interface AuthFormTitleProps {
  title: string;
}

const ProfileUpload = () => {
  return (
    <div>
      <Image src='/img/profile.png' alt='profile' width={100} height={100} />
    </div>
  );
};

const AuthFormTitle = ({ title }: AuthFormTitleProps) => {
  return (
    <Typography variant='title1-bold' as='h1' className='mb-6'>
      {title}
    </Typography>
  );
};

interface FieldGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fieldName: string;
  children?: React.ReactNode;
}

const FieldGroup = ({ children, fieldName, ...props }: FieldGroupProps) => {
  return (
    <div className='mb-6'>
      {children}
      <Typography variant='body3-semibold' as='label'>
        {fieldName}
      </Typography>
      <Input {...props} className='mt-2' />
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const FormButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button variant='primary' size='medium' className='mt-4' {...props} type='submit'>
      <Typography variant='body2-bold' as='span' className='text-white'>
        {children}
      </Typography>
    </Button>
  );
};

UserForm.Title = AuthFormTitle;
UserForm.FieldGroup = FieldGroup;
UserForm.FormButton = FormButton;
UserForm.ProfileUpload = ProfileUpload;
export default UserForm;
