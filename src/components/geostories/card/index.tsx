import { FC } from 'react';

import Link from 'next/link';

import { motion } from 'framer-motion';
import { HiOutlineNewspaper, HiOutlineGlobeAlt } from 'react-icons/hi';
import { HiOutlineArrowTopRightOnSquare, HiArrowRight } from 'react-icons/hi2';

import cn from '@/lib/classnames';

import { Geostory } from '@/types/geostories';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { TAG_STYLE } from '@/styles/constants';

const GeostoryCard: FC<Partial<Geostory> & { color?: string; headColor?: string }> = ({
  title,
  author,
  description,
  id,
  layers,
  color,
  headColor,
}) => (
  <div
    className="min-h-[388px] w-[384px]"
    style={{ backgroundColor: color }}
    data-testid={`card-${id}`}
  >
    <div className="space-y-4 px-8 py-6" style={{ backgroundColor: headColor }}>
      <div>
        <div data-testid={`card-type-${id}`} className={TAG_STYLE}>
          <span>geostory</span>
        </div>
        <h2 data-testid={`card-title-${id}`} className="font-satoshi text-2xl font-bold">
          {title}
        </h2>
      </div>
      <div className="flex items-center space-x-2">
        <Dialog>
          <DialogOverlay className="bg-brand-500 bg-opacity-50" />
          <DialogTrigger asChild>
            <Button data-testid={`card-button-${id}`} className="max-w-fit p-4">
              Known more
            </Button>
          </DialogTrigger>
          <DialogContent
            data-testid={`monitor-card-${id}`}
            className="w-[665px] bg-secondary-500 text-brand-500"
          >
            <DialogHeader className="space-y-6">
              <DialogTitle asChild>
                <header className="space-y-4">
                  <h2 data-testid="monitor-title" className="inline-block pr-6 text-6xl font-bold">
                    {title}
                  </h2>
                  <div data-testid="monitor-description" className="font-inter leading-[25px]">
                    {description ||
                      'Long description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'}
                  </div>
                </header>
              </DialogTitle>
              <DialogDescription asChild>
                <div className="font-inter">
                  <div className="space-y-5 border-y border-brand-500 py-3">
                    <p>
                      <span className="pr-2.5 font-bold">Developed by:</span>
                      {author || 'Lorem Ipsum'}
                    </p>
                    <p>
                      <span className="pr-2.5 font-bold">Monitor tool website:</span>
                      www.toolname.com
                    </p>
                    <p>
                      <span className="pr-2.5 font-bold">Output format:</span>GeoTiff, gpkg
                    </p>
                    <p>
                      <span className="pr-2.5 font-bold">Spatial resolution:</span>Lorem Ipsum
                    </p>
                    <p>
                      <span className="pr-2.5 font-bold">Temporal resolution:</span>Lorem Ipsum
                    </p>
                  </div>
                  <div>
                    <Link
                      href=""
                      className="flex items-center space-x-2 border-b border-brand-500 py-5 text-2xl font-bold"
                    >
                      <HiOutlineNewspaper />
                      <span>Publications</span>
                    </Link>
                    <Link
                      href=""
                      className="flex items-center space-x-2 border-b border-brand-500 py-5 text-2xl font-bold"
                    >
                      <HiOutlineGlobeAlt />
                      <span>Use cases</span>
                    </Link>
                  </div>

                  <Link
                    href={`/map/${id}/datasets`}
                    data-testid="monitor-button"
                    className={cn(
                      'mt-3 flex min-h-[38px] w-full items-center justify-center space-x-2 border-2 border-brand-500 px-6 py-2 text-xs font-bold transition-colors hover:bg-secondary-500/20'
                    )}
                  >
                    Launch monitor
                  </Link>
                  <DialogClose className="right-10 top-10 flex h-4 items-center space-x-2 text-xs font-medium uppercase tracking-[0.96px] text-brand-500">
                    Close
                  </DialogClose>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
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
);

export default GeostoryCard;
