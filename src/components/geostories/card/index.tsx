import { FC } from 'react';

import Link from 'next/link';

import { motion } from 'framer-motion';
import { HiOutlineNewspaper, HiOutlineGlobeAlt } from 'react-icons/hi';
import { HiOutlineArrowTopRightOnSquare, HiArrowRight } from 'react-icons/hi2';
import { LuRefreshCcw } from 'react-icons/lu';

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
  ready,
  theme,
  notebooks_url,
  metadata_url,
  publications,
  use_case_link,
}) => (
  <div
    className="min-h-[388px] w-[384px]"
    style={{ backgroundColor: color }}
    data-testid={`card-${id}`}
  >
    <div className="space-y-4 px-8 py-6" style={{ backgroundColor: headColor }}>
      <div className="space-y-2">
        <div data-testid={`card-type-${id}`} className={TAG_STYLE}>
          <span>geostory</span> | <span className="capitalize">#{theme || 'Unknown'}</span>
        </div>
        <h2 data-testid={`card-title-${id}`} className="font-satoshi text-2xl font-bold">
          {title}
        </h2>
      </div>
      {ready ? (
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
                    <h2
                      data-testid="monitor-title"
                      className="inline-block pr-6 text-6xl font-bold"
                    >
                      {title}
                    </h2>
                    <div data-testid="monitor-description" className="font-inter leading-[25px]">
                      {description ||
                        'Long description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'}
                    </div>
                  </header>
                </DialogTitle>
                <DialogDescription asChild>
                  <div>
                    <div className="border-t border-brand-500 py-6">
                      <dl className="space-y-2 py-2">
                        <div className="flex space-x-2">
                          <dt className="whitespace-nowrap font-bold">Author:</dt>
                          <dd>{author}</dd>
                        </div>
                        <div className="flex space-x-2">
                          <dt className="whitespace-nowrap font-bold">Computational notebook:</dt>
                          <dd>
                            {notebooks_url && (
                              <a href={notebooks_url} className="break-all hover:underline">
                                {notebooks_url}
                              </a>
                            )}
                          </dd>
                        </div>
                        <div className="flex space-x-2">
                          <dt className="whitespace-nowrap font-bold">Metadata link:</dt>
                          <dd className="grow-0">
                            {metadata_url && (
                              <a href={metadata_url} className="break-all hover:underline">
                                {metadata_url}
                              </a>
                            )}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div className="border-t border-brand-500 py-6">
                      <h3 className="flex items-center space-x-2">
                        <HiOutlineNewspaper className="h-6 w-6" />
                        <span className="text-2xl font-bold">Publications</span>
                      </h3>
                      {publications.length > 0 && (
                        <ul className="space-y-2 py-2 pl-8 font-bold">
                          {publications.map(({ url, title }) => (
                            <li key={title}>
                              <a href={url} className="underline">
                                {title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="border-t border-brand-500 py-6">
                      <h3 className="flex items-center space-x-2">
                        <HiOutlineGlobeAlt className="h-6 w-6" />
                        <span className="text-2xl font-bold">Use cases</span>
                      </h3>
                      {use_case_link.length > 0 && (
                        <ul className="space-y-2 py-2 pl-8 font-bold">
                          {use_case_link.map(({ url, title }) => (
                            <li key={title}>
                              <a href={url} className="underline">
                                {title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
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
      ) : (
        <div>
          <div className="float-left flex items-center space-x-2 rounded-md bg-black/10 px-3 py-2 leading-none">
            <LuRefreshCcw className="h-5 w-5" />
            <span className="text-xs">Geostory under-development</span>
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
);

export default GeostoryCard;
