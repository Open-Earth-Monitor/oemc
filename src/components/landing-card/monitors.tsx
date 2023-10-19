import { FC } from 'react';

import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';

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

const Card: FC<Partial<Monitor> & { color?: string }> = ({ id, description, title, color }) => (
  <AnimatePresence>
    <motion.div
      className="h-[388px] w-[384px] space-y-6 p-6"
      style={{ backgroundColor: color }}
      data-testid={`card-${id}`}
      whileHover={{
        translateY: '-10px',
      }}
      transition={{ duration: 0.1 }}
    >
      <div>
        <span data-testid={`card-type-${id}`} className="text-xs uppercase">
          monitor
        </span>
        <h2 data-testid={`card-title-${id}`} className="font-satoshi text-2xl font-bold">
          {title}
        </h2>
      </div>

      <p data-testid={`card-description-${id}`}>{description}</p>

      <Dialog>
        <DialogOverlay className="bg-brand-500 bg-opacity-50" />
        <DialogTrigger className="w-full" asChild>
          <Button variant="light" data-testid={`card-button-${id}`}>
            Explore monitor
          </Button>
        </DialogTrigger>
        <DialogContent
          data-testid={`monitor-card-${id}`}
          className="w-[665px] bg-white p-10 py-6 text-brand-500"
        >
          <DialogHeader className="space-y-4">
            <DialogTitle asChild>
              <header className="divide-x-secondary-500 divide-x">
                <h2
                  data-testid="monitor-title"
                  className="inline-block pr-6 font-satoshi text-5xl font-bold"
                >
                  {title}
                </h2>
                <div data-testid="monitor-description">{description}</div>
              </header>
            </DialogTitle>
            <DialogDescription asChild>
              <div>
                <Link
                  href={`/map/${id}/datasets`}
                  data-testid="monitor-button"
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
    </motion.div>
  </AnimatePresence>
);

export default Card;
