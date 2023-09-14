import { FC } from 'react';

import cx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import type { LoadingProps } from './types';

const Loading: FC<LoadingProps> = ({
  visible = false,
  className = 'absolute',
  iconClassName = 'w-5 h-5',
  transition = {},
}: LoadingProps) => {
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {visible && (
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
      )}
    </AnimatePresence>
  );
};

export default Loading;
