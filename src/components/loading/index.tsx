import { FC } from 'react';

import cx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import type { LoadingProps } from './types';

const Loading: FC<LoadingProps> = ({
  className = 'relative flex justify-center items-center w-full h-[200px]',
  iconClassName = 'w-5 h-5 animate-spin text-secondary-500',
  transition = {},
}: LoadingProps) => {
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      <motion.div
        key="loading"
        {...variants}
        transition={transition}
        className={cx({
          [className]: !!className,
        })}
      >
        <AiOutlineLoading3Quarters className={iconClassName} />
      </motion.div>
    </AnimatePresence>
  );
};

export default Loading;
