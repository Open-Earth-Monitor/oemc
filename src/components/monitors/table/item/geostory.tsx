import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { HiOutlineChevronUp } from 'react-icons/hi';

import { cn } from '@/lib/classnames';
import { MonitorParsed } from '@/types/monitors';

export const GeostoriesLink = ({ geostories = [], color, colorOpacity }: MonitorParsed) => {
  const [borderColor, setBorderColor] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const controls = useAnimationControls();
  const geostoriesLength = geostories.length;

  const handleVisibility = async () => {
    setIsExpanded((prev) => !prev);

    if (isExpanded) {
      await controls.start({ height: 0, opacity: 0 });
    } else {
      await controls.start({ height: 'auto', opacity: 1 });
    }
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        <button
          data-testid="geostories-button"
          type="button"
          className="flex items-center"
          onClick={handleVisibility}
        >
          <HiOutlineChevronUp
            className={cn('inline-block h-4 w-4 rotate-90', {
              'rotate-180': isExpanded,
            })}
          />
          <span>Show </span>
        </button>
        <div
          data-testid="geostories-container"
          className="cursor-pointer rounded-3xl border border-transparent bg-opacity-80 px-2"
          style={{
            backgroundColor: isExpanded ? color : colorOpacity,
            color: isExpanded ? 'hsl(210, 53%, 7%)' : color,
            borderColor: borderColor,
          }}
          onMouseEnter={() => setBorderColor(color)}
          onMouseLeave={() => setBorderColor(null)}
          onClick={handleVisibility} // Adding onClick to make it interactive
        >
          {geostoriesLength > 1 ? `${geostoriesLength} Geostories` : `${geostoriesLength} Geostory`}
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.ul
            className="mt-2 space-y-2 font-bold"
            style={{ overflow: 'hidden' }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {geostories.map(({ id: geostoryId, title }) => (
              <motion.li
                key={`monitor-geostory-${geostoryId}`}
                initial="initial"
                whileHover="hover"
              >
                <Link href={`/map/geostories/${geostoryId}`} className="block">
                  <div className="text-left">
                    <span>{title}</span>
                    <motion.div
                      className="h-0.5 w-0 bg-secondary-500"
                      variants={{
                        initial: { width: 0 },
                        hover: { width: '100%' },
                      }}
                    />
                  </div>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
};

export default GeostoriesLink;
