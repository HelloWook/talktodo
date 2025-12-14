import Image from 'next/image';

import { cn } from '@/utils/cn';

import Button from '../Button/Button';
import Input from '../Input/Input';
import Typography from '../Typography/Typography';
import ProfileUpload from './ProfileUpload/ProfileUpload';
interface UserFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

const UserForm = ({ children, onSubmit, ...props }: UserFormProps) => {
  return (
    <form {...props} className='flex h-[613px] w-[90%] max-w-[640px] flex-col rounded-[28px] bg-white p-10 shadow' onSubmit={onSubmit}>
      {children}
    </form>
  );
};

interface AuthFormTitleProps {
  title: string;
}

interface UserProfileUploadProps {
  imageRef: React.RefObject<HTMLInputElement | null>;
  currentImageUrl?: string;
  onFileSelect?: (file: File) => void;
}

const UserProfileUpload = ({ imageRef, currentImageUrl, onFileSelect }: UserProfileUploadProps) => {
  return (
    <div>
      <ProfileUpload imageRef={imageRef} currentImageUrl={currentImageUrl} onFileSelect={onFileSelect} />
    </div>
  );
};

interface UserProfileDisplayProps {
  currentImageUrl?: string;
}

const UserProfileDisplay = ({ currentImageUrl }: UserProfileDisplayProps) => {
  return (
    <div className='mb-[44px] flex flex-col items-center justify-center'>
      <Image
        src={currentImageUrl || '/img/Profile.png'}
        alt='프로필'
        width={140}
        height={140}
        className='!h-[140px] rounded-full object-cover'
      />
    </div>
  );
};

const AuthFormTitle = ({ title }: AuthFormTitleProps) => {
  return (
    <Typography variant='title1-semibold' as='h1' className='mb-6'>
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
  className?: string;
}

const FormButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <Button variant='primary' size='medium' className={cn('w-full', className)} {...props} type='submit' onClick={() => {}}>
      <Typography variant='body2-bold' as='span'>
        {children}
      </Typography>
    </Button>
  );
};

UserForm.Title = AuthFormTitle;
UserForm.FieldGroup = FieldGroup;
UserForm.FormButton = FormButton;
UserForm.UserProfileUpload = UserProfileUpload;
UserForm.UserProfileDisplay = UserProfileDisplay;
export default UserForm;
