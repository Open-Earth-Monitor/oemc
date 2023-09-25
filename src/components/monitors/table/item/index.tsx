'use client';
import { useState, useMemo } from 'react';

import Link from 'next/link';

import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { HiOutlineChevronUp } from 'react-icons/hi';

import { cn } from '@/lib/classnames';

import { MonitorColorTypes } from '@/types/datasets';

import { Separator } from '@/components/ui/separator';
import { TableCell } from '@/components/ui/table';

const MonitorsItem = ({ data }: { data: MonitorColorTypes }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const controls = useAnimationControls();
  const { id, title, geostories, color, colorOpacity } = data ?? {};
  const geostoriesLength = geostories.length;
  const geostoriesSentence = useMemo(
    () =>
      geostoriesLength > 1 ? `${geostoriesLength} Geostories` : `${geostoriesLength} Geostory`,
    [geostoriesLength]
  );

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
        <div className="flex min-h-[62px] w-full items-center space-x-6">
          <Separator
            orientation="vertical"
            className="h-full min-h-[62px] w-0.5"
            style={{ backgroundColor: color }}
          />
          <Link
            data-testid={`monitor-item-${id}`}
            key={id}
            href={`/map/${id}/datasets`}
            className=" flex items-center font-bold"
          >
            <AnimatePresence>
              <div className="flex w-full flex-col">
                <motion.h4 whileHover="hover">{title}.</motion.h4>
                <motion.div
                  className="h-1 w-full bg-secondary-500"
                  style={{
                    width: 0,
                  }}
                  whileHover={{ width: '100%' }}
                />
              </div>
            </AnimatePresence>
          </Link>
        </div>
      </TableCell>
      <TableCell className="space-x-6">
        <button
          data-testid="geostories-button"
          type="button"
          className="flex items-center space-x-3 pt-2.5"
          onClick={() => void handleVisibility()}
        >
          <HiOutlineChevronUp
            className={cn({
              'inline-block h-3 w-3 rotate-90': true,
              'rotate-180': isExpanded,
            })}
          />
          <p className="space-x-4">
            <span>Show </span>
            <span
              data-testid="geostories-container"
              style={{
                backgroundColor: isExpanded ? color : colorOpacity,
                color: isExpanded ? 'hsl(210, 53%, 7%)' : color,
                opacity: 0.5,
              }}
              className={cn({
                'rounded-3xl px-2 py-0.5 text-brand-500 text-opacity-5': true,
                'text-brand-500 opacity-100': isExpanded,
              })}
            >
              {geostoriesSentence}
            </span>
          </p>
        </button>
        <AnimatePresence>
          <motion.ol
            className="list-decimal space-y-2 pb-7 pt-2 font-bold"
            style={{ overflow: 'hidden' }}
            initial={{ height: 0, opacity: 0 }}
            animate={controls}
            transition={{ duration: 0 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {geostoriesLength > 0 && geostories.map(({ title }) => <li key={title}>{title}</li>)}
          </motion.ol>
        </AnimatePresence>
      </TableCell>
    </>
  );
};

export default MonitorsItem;
