'use client';

import Button from '../Button/Button';
import Input from '../Input/Input';
import Typography from '../Typography/Typography';
import ProfileUpload from './ProfileUpload/ProfileUpload';

interface UserFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

interface UserFormTitleProps {
  onSubmit: () => void;
}

const UserForm = ({ children, onSubmit, ...props }: UserFormProps) => {
  return (
    <form {...props} className='h-[613px] w-[90%] max-w-[640px] rounded-[28px] bg-[var(--color-white)] p-10 shadow' onSubmit={onSubmit}>
      {children}
    </form>
  );
};

interface AuthFormTitleProps {
  title: string;
}

interface UserProfileUploadProps {
  imageRef: React.RefObject<HTMLInputElement | null>;
}

const UserProfileUpload = ({ imageRef }: UserProfileUploadProps) => {
  return (
    <div>
      <ProfileUpload imageRef={imageRef} />
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
}

const FormButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button variant='primary' size='medium' {...props} type='submit' onClick={() => {}}>
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
export default UserForm;
