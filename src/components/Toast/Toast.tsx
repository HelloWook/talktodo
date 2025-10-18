import { motion } from 'framer-motion';

import { Typography } from '../Typography/Typography';

interface ToastProps {
  id: string;
  content: string;
}

const Toast = ({ content }: ToastProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={'m-auto flex w-[90%] max-w-[240px] items-center justify-center rounded-3xl bg-[#29252B]/80 px-[41.5px] py-[20px]'}
    >
      <Typography variant='body1-semibold' className='text-nowrap text-white'>
        {content}
      </Typography>
    </motion.div>
  );
};

export default Toast;
