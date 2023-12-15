import Link from 'next/link';

import { HiOutlineNewspaper, HiOutlineGlobeAlt } from 'react-icons/hi';

import cn from '@/lib/classnames';

import type { Geostory } from '@/types/geostories';

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

type GeostoryDialogProps = Partial<Geostory>;

const GeostoryDialog: React.FC<GeostoryDialogProps> = ({
  id,
  title,
  description,
  author,
  metadata_url,
  notebooks_url,
  use_case_link,
  publications,
}) => (
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
          <header className="space-y-6">
            <h2 data-testid="monitor-title" className="inline-block pr-6 text-6xl font-bold">
              {title}
            </h2>
            <div data-testid="monitor-description" className="font-inter leading-[25px]">
              {description}
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
);

export default GeostoryDialog;
