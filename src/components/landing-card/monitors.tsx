import { FC } from 'react';

import Link from 'next/link';

import cn from '@/lib/classnames';

import { Monitor } from '@/types/monitors';

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

const Card: FC<Partial<Monitor> & { color?: string }> = ({ id, description, title, color }) => (
  <div
    className="h-[388px] w-[384px] space-y-6 p-6"
    style={{ backgroundColor: color }}
    data-testid={`dataset-item-${id}`}
  >
    <div>
      <span className="text-xs uppercase">monitor</span>
      <h2 data-testid="dataset-title" className="font-satoshi text-2xl font-bold">
        {title}
      </h2>
    </div>

    <p data-testid="dataset-description">{description}</p>

    <Dialog>
      <DialogOverlay className="bg-brand-500 bg-opacity-50" />
      <DialogTrigger className="w-full" asChild>
        <button
          type="button"
          className={cn(
            'flex min-h-[38px] w-full items-center justify-center space-x-2 border-2 border-brand-500 px-6 py-2 text-xs font-bold transition-colors hover:bg-secondary-500/20'
          )}
        >
          Explore monitor
        </button>
      </DialogTrigger>
      <DialogContent className="w-[665px] bg-white p-10 py-6 text-brand-500 ">
        <DialogHeader className="space-y-4">
          <DialogTitle asChild>
            <header className="divide-x-secondary-500 divide-x">
              <h2 className="inline-block pr-6 font-satoshi text-5xl font-bold">{title}</h2>
              <div>{description}</div>
            </header>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="">
              <Link
                href={`/map/${id}/datasets`}
                data-testid="dataset-layer-toggle-button"
                className={cn(
                  'flex min-h-[38px] w-full items-center justify-center space-x-2 border-2 border-brand-500 px-6 py-2 text-xs font-bold transition-colors hover:bg-secondary-500/20'
                )}
              >
                Launch monitor
              </Link>
              <DialogClose>close</DialogClose>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </div>
);

export default Card;
