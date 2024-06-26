import { useState } from 'react';

import Link from 'next/link';

import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { HiOutlineChevronUp } from 'react-icons/hi';

import { cn } from '@/lib/classnames';

import { MonitorParsed } from '@/types/monitors';

import { TableCell } from '@/components/ui/table';
const MonitorsItem = ({ data }: { data: MonitorParsed }) => {
  const [borderColor, setBorderColor] = useState<string>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const controls = useAnimationControls();
  const { id, title, geostories, color, colorOpacity } = (data ?? {}) as MonitorParsed;
  const geostoriesLength = geostories.length;

  const handleVisibility = async () => {
    setIsExpanded(!isExpanded);

    if (isExpanded) {
      await controls.start({ height: 0, opacity: 0 });
    } else {
      await controls.start({ height: 'auto', opacity: 1 });
    }
  };

  return (
    <>
      <TableCell>
        <Link
          data-testid={`monitor-item-${id}`}
          key={id}
          href={`/map/${id}/datasets`}
          className={`flex items-center border-l-4 px-4 font-bold`}
          style={{ borderLeftColor: color }}
        >
          <motion.h2 initial="initial" whileHover="hover" className="text-2xl font-bold">
            <span className="block">{title}.</span>
            <motion.div
              className="h-0.5 w-0 bg-secondary-500"
              variants={{
                initial: { width: 0 },
                hover: { width: '100%' },
              }}
            />
          </motion.h2>
        </Link>
      </TableCell>
      <TableCell>
        <button
          data-testid="geostories-button"
          type="button"
          className="flex items-center space-x-4"
          onClick={() => handleVisibility()}
        >
          <HiOutlineChevronUp
            className={cn({
              'inline-block h-4 w-4 rotate-90': true,
              'rotate-180': isExpanded,
            })}
          />
          <div>Show </div>
          <button
            data-testid="geostories-container"
            className="rounded-3xl border border-transparent bg-opacity-80 px-2"
            style={{
              backgroundColor: isExpanded ? color : colorOpacity,
              color: isExpanded ? 'hsl(210, 53%, 7%)' : color,
              borderColor: borderColor,
            }}
            onMouseEnter={() => setBorderColor(color)}
            onMouseLeave={() => setBorderColor(null)}
          >
            {geostoriesLength > 1
              ? `${geostoriesLength} Geostories`
              : `${geostoriesLength} Geostory`}
          </button>
        </button>
        <AnimatePresence>
          <motion.ul
            className="mt-2 space-y-2 font-bold"
            style={{ overflow: 'hidden' }}
            initial={{ height: 0, opacity: 0 }}
            animate={controls}
            transition={{ duration: 0 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {geostoriesLength > 0 &&
              geostories.map(({ id: geostoryId, title }) => (
                <motion.li
                  key={`monitor-geostory-${geostoryId}`}
                  initial="initial"
                  whileHover="hover"
                >
                  <Link href={`/map/geostories/${geostoryId}`} className="block">
                    <div>
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
        </AnimatePresence>
      </TableCell>
    </>
  );
};

export default MonitorsItem;
