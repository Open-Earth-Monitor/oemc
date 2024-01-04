import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { HiOutlineArrowTopRightOnSquare, HiArrowRight } from 'react-icons/hi2';
import { LuRefreshCcw } from 'react-icons/lu';

import cn from '@/lib/classnames';

import { Geostory } from '@/types/geostories';

import { TAG_STYLE } from '@/styles/constants';

import GeostoryDialog from '../dialog';

const GeostoryCard: FC<Partial<Geostory> & { color?: string; colorHead?: string }> = (geostory) => {
  const { id, colorHead, title, color, ready, theme, layers } = geostory;

  return (
    <div
      className="flex min-h-[468px] flex-col justify-between"
      style={{ backgroundColor: color, color: ready ? 'inherit' : '#000' }}
      data-testid={`card-${id}`}
    >
      <div>
        <div
          className="flex min-h-[235px] grow-0 flex-col justify-between space-y-4 px-8 py-6"
          style={{ backgroundColor: colorHead, color: ready ? 'inherit' : '#000' }}
        >
          <div className="space-y-2">
            <div data-testid={`card-type-${id}`} className={TAG_STYLE}>
              <span>geostory</span> | <span className="capitalize">#{theme || 'Unknown'}</span>
            </div>
            <h2 data-testid={`card-title-${id}`} className="font-satoshi text-2xl font-bold">
              {title}
            </h2>
          </div>
          {ready ? (
            <div className="flex items-center space-x-8">
              <GeostoryDialog {...geostory} />
              <Link
                href={`/map/geostories/${id}`}
                data-testid={`card-link-${id}`}
                className={cn(
                  'flex items-center space-x-2.5 py-2 text-xs font-bold transition-colors hover:underline'
                )}
              >
                <HiOutlineArrowTopRightOnSquare className="h-5 w-5" />
                <span className="hover:underline ">Go to geostory</span>
              </Link>
            </div>
          ) : (
            <div>
              <div className="float-left flex items-center space-x-2 rounded-md bg-black/10 px-3 py-2 leading-none">
                <LuRefreshCcw className="h-5 w-5" />
                <span className="text-xs font-bold">Geostory under-development</span>
              </div>
            </div>
          )}
        </div>
        {/* TO - DO - This should be a list of monitors, not layers. Implemented just for visualization purposes. Remove when API returns the monitor the geo story belongs to in the endpoint */}
        {!!layers.length && (
          <div className="px-10 py-4 text-brand-500">
            <span className={TAG_STYLE}>monitor</span>
            <motion.div
              className="opacity-1 relative flex items-center"
              initial="initial"
              whileHover="hover"
              transition={{ duration: 0.3 }}
            >
              <Link
                href={`/map/${layers[0]?.layer_id}/datasets`}
                className="w-full font-bold underline"
              >
                <motion.span
                  variants={{
                    initial: {
                      opacity: 0,
                    },
                    hover: {
                      opacity: 1,
                    },
                  }}
                >
                  <HiArrowRight className="absolute left-0 top-2 inline-block h-5 w-5 fill-current" />
                </motion.span>
                <motion.span
                  className="absolute left-0 top-2 inline-flex whitespace-normal pb-11 underline"
                  variants={{
                    initial: {
                      x: 0,
                    },
                    hover: {
                      x: 30,
                    },
                  }}
                  transition={{ duration: 0.25 }}
                >
                  {layers[0]?.title}
                </motion.span>
              </Link>
            </motion.div>
          </div>
        )}
      </div>

      <div className="flex justify-end px-6 pb-6">
        <div className="relative h-[40px] w-[40px]">
          <Image src={`/svgs/theme-icons/${theme.toLowerCase()}.svg`} fill alt={theme} />
        </div>
      </div>
    </div>
  );
};

export default GeostoryCard;
