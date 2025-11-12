import { motion } from 'framer-motion';
import React from 'react';

import { AlertProps } from './Alert.type';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Typography from '../Typography/Typography';

const Alert = ({ message, handleClick, onClose }: AlertProps) => {
  const handleButtonClick = () => {
    if (onClose) {
      onClose();
    }
    if (handleClick) {
      handleClick();
    }
  };

  return (
    <motion.div
      className='pointer-events-auto m-auto flex h-[65px] w-[90%] max-w-[800px] items-center gap-2 rounded-2xl bg-purple-100 py-3 pr-3 pl-5'
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={(e) => e.stopPropagation()}
    >
      <Icon name='alert' className='h-6 w-6 fill-purple-100' />
      <Typography variant='body2-semibold' className='text-primary flex-1 text-nowrap'>
        {message}
      </Typography>
      {handleClick && (
        <Button className='h-[41px] max-w-[138px] cursor-pointer px-5 py-3' variant='primary' onClick={handleButtonClick}>
          <Typography variant='body3-semibold' className='text-nowrap'>
            변경사항 저장하기
          </Typography>
        </Button>
      )}
    </motion.div>
  );
};

export default Alert;
