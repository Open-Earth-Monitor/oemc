'use client';
import { useState, useMemo, useCallback } from 'react';

import Link from 'next/link';

import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';

import { cn } from '@/lib/classnames';

import { MonitorTypes } from '@/types/datasets';

// const variants = {
//   icon: {
//     initial: { opacity: '0' },
//     whileHover: { opacity: '1' },
//     transition: { type: 'spring', stiffness: 120, duration: 0.2 },
//   },
//   text: {
//     initial: { paddingLeft: 0 },
//     whileHover: { paddingLeft: 15 },
//     transition: { duration: 0.1 },
//   },
// };

const MonitorsItem = ({ data }: { data: MonitorTypes }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const controls = useAnimationControls();
  const { title, id, geostories } = data;
  const geostoriesLength = geostories.length;
  const geostoriesSentence = useMemo(
    () =>
      geostoriesLength > 1 ? `${geostoriesLength} geostories` : `${geostoriesLength} geostory`,
    [geostoriesLength]
  );

  const handleVisibility = useCallback(async () => {
    setIsExpanded(!isExpanded);

    if (isExpanded) {
      await controls.start({ height: 0 });
    } else {
      await controls.start({ height: 'auto' });
    }
  }, [controls, isExpanded]);

  return (
    <div className="first:b-t-secondary-50 border-b-secondary-50 space-y-3 border-b py-4 first:border-t">
      <Link href={`/map?monitor_id=${id}`} className="inter flex items-center font-bold underline">
        <div className="flex space-x-3">
          <AnimatePresence>
            {/* <motion.div whileHover="hover" variants={variants.icon}>
              <ChevronUpDownIcon className="inline-block h-3 w-3 -rotate-90" />
            </motion.div> */}
            <motion.h4 whileHover="hover">{title}.</motion.h4>
          </AnimatePresence>
        </div>
      </Link>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <button type="button" className="flex items-center space-x-3" onClick={handleVisibility}>
        <ChevronUpDownIcon
          className={cn({
            'inline-block h-3 w-3 -rotate-90 ': true,
            'rotate-0': isExpanded,
          })}
        />
        <p>
          Show{' '}
          <span className="rounded-sm bg-secondary-600 bg-opacity-95 px-2 py-0.5">
            {geostoriesSentence}
          </span>
        </p>
      </button>
      <AnimatePresence>
        <motion.ol
          className="list-decimal space-y-2"
          style={{ overflow: 'hidden' }}
          initial={{ height: 0 }}
          animate={controls}
          transition={{ duration: 0.5 }}
          exit={{ height: 0 }}
        >
          {geostoriesLength > 0 &&
            geostories.map(({ title }) => (
              <li key={title} className="ml-5 underline">
                {title}
              </li>
            ))}
        </motion.ol>
      </AnimatePresence>
    </div>
  );
};

export default MonitorsItem;
