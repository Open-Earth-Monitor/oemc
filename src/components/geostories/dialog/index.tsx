import { useMemo } from 'react';

import { compact } from 'lodash-es';
import { LuInfo } from 'react-icons/lu';

import type { Geostory } from '@/types/geostories';

import KnowledgePackage from '@/components/monitors/dialog/knowledge-package';
import {
  Dialog,
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
}) => {
  const publicationsArray = useMemo(
    () =>
      Array.isArray(publications)
        ? compact(publications.map(({ url, title }) => (url && title ? { url, title } : null)))
        : [],
    [publications]
  );

  const hasValidLink =
    Array.isArray(use_case_link) && use_case_link.some(({ title, url }) => Boolean(title || url));
  return (
    <Dialog>
      <DialogTrigger
        data-testid={`card-button-${id}`}
        className="flex items-center space-x-3 text-xs font-bold"
      >
        <LuInfo className="h-6 w-6" />
        <span>More info</span>
      </DialogTrigger>
      <DialogContent
        data-testid={`geostory-card-${id}`}
        className="w-full bg-secondary-500 text-brand-500 sm:w-[665px]"
      >
        <DialogHeader className="space-y-6">
          <DialogTitle asChild>
            <header className="space-y-6 py-6 sm:py-0">
              <h2
                data-testid="geostory-title"
                className="inline-block pr-6 text-[28px] font-medium"
              >
                {title}
              </h2>
              <div
                data-testid="geostory-description"
                className="flex flex-wrap font-inter leading-[25px]"
              >
                {description}
              </div>
            </header>
          </DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className="border-t border-brand-500 py-6">
                <dl className="space-y-2 py-2">
                  <div className="flex  space-x-2">
                    <dt className="whitespace-nowrap font-bold">Author:</dt>
                    <dd>{author}</dd>
                  </div>
                  {notebooks_url && (
                    <div className="flex space-x-2">
                      <dt className="whitespace-nowrap font-bold">Computational notebook:</dt>
                      <dd>
                        <a href={notebooks_url} className="break-all underline">
                          {notebooks_url}
                        </a>
                      </dd>
                    </div>
                  )}
                  {metadata_url && (
                    <div className="flex space-x-2">
                      <dt className="whitespace-nowrap font-bold">Metadata link:</dt>
                      <dd className="grow-0">
                        <a href={metadata_url} className="break-all underline">
                          {metadata_url}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
              {publicationsArray?.length > 0 && (
                <div className="border-t border-brand-500 py-6">
                  <div className="space-y-2 py-2">
                    <div className="flex flex-col space-y-4">
                      <h3 className="whitespace-nowrap text-xl font-medium">Publications:</h3>

                      <ul className="space-y-2 py-2 pl-8 text-sm font-bold">
                        {publications?.map(({ url, title }) => (
                          <li key={title}>
                            <a href={url} className="underline">
                              {title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              {hasValidLink && <KnowledgePackage items={use_case_link} />}

              <DialogClose className="right-10 top-10 flex h-4 items-center space-x-2 text-xs font-medium uppercase tracking-[0.96px] text-brand-500" />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default GeostoryDialog;
