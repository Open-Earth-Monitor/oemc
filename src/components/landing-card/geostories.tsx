import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { HiOutlineArrowTopRightOnSquare, HiArrowRight } from 'react-icons/hi2';

import cn from '@/lib/classnames';

import { GeostoryParsed } from '@/types/geostories';

import { TAG_STYLE } from '@/styles/constants';

const Card: FC<Partial<GeostoryParsed>> = ({
  title,
  id,
  layers,
  color,
  theme,
  icon,
  background,
}) => (
  <div
    className="relative min-h-[388px] w-[384px]"
    style={{ backgroundColor: color }}
    data-testid={`card-${id}`}
  >
    <div
      className="space-y-4 bg-cover bg-center px-8 py-6"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div>
        <div className="flex h-full items-center space-x-2.5 divide-x-2 divide-secondary-950 text-xs">
          <span data-testid={`card-type-${id}`} className={TAG_STYLE}>
            <span>geostory</span>
          </span>
          <span className="pl-2.5">{theme}</span>
        </div>
        <h2 data-testid={`card-title-${id}`} className="font-satoshi text-2xl font-bold">
          {title}
        </h2>
      </div>
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
    {/* TO - DO - This should be a list of monitors, not layers. Implemented just for visualization purposes. Remove when API returns the monitor the geo story belongs to in the endpoint */}
    {!!layers.length && (
      <div className="px-10 py-4 text-brand-500">
        <div className="text-xs">
          <span data-testid={`card-type-${id}`} className={TAG_STYLE}>
            monitor
          </span>
        </div>
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
        <Image
          alt={theme}
          src={icon}
          width={45}
          height={50}
          className={`absolute bottom-3.5 right-3`}
        />
      </div>
    )}
  </div>
);

export default Card;
