import { FC } from 'react';

import Link from 'next/link';

import { HiOutlineNewspaper, HiOutlineGlobeAlt } from 'react-icons/hi';

import cn from '@/lib/classnames';

import { Monitor } from '@/types/monitors';

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

const Card: FC<Partial<Monitor> & { color?: string }> = ({
  id,
  description,
  title,
  color,
  author,
}) => (
  <div
    className="h-[388px] w-[384px] space-y-4 px-10 py-6 text-brand-500"
    style={{ backgroundColor: color }}
    data-testid={`card-${id}`}
  >
    <div>
      <span data-testid={`card-type-${id}`} className={TAG_STYLE}>
        monitor
      </span>
      <h2 data-testid={`card-title-${id}`} className="font-satoshi text-2xl font-bold">
        {title}
      </h2>
    </div>

    {description && <p data-testid={`card-description-${id}`}>{description}</p>}

    <Dialog>
      <DialogOverlay className="bg-brand-500 bg-opacity-50" />
      <DialogTrigger asChild>
        <Button variant="light" data-testid={`card-button-${id}`} className="max-w-fit p-4">
          Explore monitor
        </Button>
      </DialogTrigger>
      <DialogContent
        data-testid={`monitor-card-${id}`}
        className="w-[665px] bg-white p-10 text-brand-500"
      >
        <DialogHeader className="space-y-6">
          <DialogTitle asChild>
            <header className="space-y-4">
              <h2
                data-testid="monitor-title"
                className="inline-block max-w-[50%] pr-6 font-satoshi text-5xl font-bold"
              >
                {title}
              </h2>
              <div data-testid="monitor-description">
                {description ||
                  'Long description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'}
              </div>
            </header>
          </DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className="space-y-2 border-y border-brand-500 py-3">
                <p>
                  <span className="pr-2.5 font-bold">Developed by:</span>
                  {author || 'Lorem Ipsum'}
                </p>
                <p>
                  <span className="pr-2.5 font-bold">Monitor tool website:</span>www.toolname.com
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
                  className="flex items-center space-x-2 border-b border-brand-500 py-2 text-2xl font-bold"
                >
                  <HiOutlineNewspaper />
                  <span>Publications</span>
                </Link>
                <Link
                  href=""
                  className="flex items-center space-x-2 border-b border-brand-500 py-2 text-2xl font-bold"
                >
                  <HiOutlineGlobeAlt />
                  <span>Use cases</span>
                </Link>
              </div>
              <Link
                href={`/map/${id}/datasets`}
                data-testid="monitor-button"
                className={cn(
                  'mt-4 flex min-h-[38px] w-full items-center justify-center space-x-2 border-2 border-brand-500 px-6 py-2 text-xs font-bold transition-colors hover:bg-secondary-500/20'
                )}
              >
                Launch monitor
              </Link>
              <DialogClose className="flex items-center space-x-3 text-sm font-medium uppercase">
                Close
              </DialogClose>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </div>
);

export default Card;
