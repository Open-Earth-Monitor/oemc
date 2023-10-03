'use client';

import { FC } from 'react';

import cx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import type { LoadingProps } from './types';

const Loading: FC<LoadingProps> = ({
  className = 'relative flex justify-center items-center w-full h-[200px]',
  iconClassName = 'w-5 h-5 animate-spin text-secondary-500',
}: LoadingProps) => {
  return (
    <AnimatePresence>
      <motion.div
        key="loading"
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
