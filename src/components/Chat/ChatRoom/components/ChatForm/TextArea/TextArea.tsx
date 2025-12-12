import React from 'react';

const TextArea = ({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <>
      <textarea
        {...props}
        rows={5}
        placeholder='할 일을 입력해 주세요'
        className='font-body2-medium-loose flex-1 resize-none overflow-y-auto leading-[160%] text-gray-900 outline-none placeholder:text-gray-500'
      />
      <div className='mx-2 h-full border-r border-gray-200' />
    </>
  );
};

export default TextArea;
