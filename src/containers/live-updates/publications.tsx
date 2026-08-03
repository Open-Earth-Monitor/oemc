'use client';

import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import type { Publication } from '@/hooks/publications';

import { formatPublicationDate, SOURCE_LABEL } from '@/components/publications/card';
import { Skeleton } from '@/components/ui/skeleton';

type PublicationsProps = {
  data: Publication[];
  isLoading: boolean;
};

export const Publications = ({ data, isLoading }: PublicationsProps) => {
  return (
    <div
      className="m-auto grid grid-cols-1 gap-4 pb-16 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:w-full xl:grid-cols-4 xl:gap-6 2xl:grid-cols-6"
      data-testid="publications-list"
    >
      {isLoading &&
        Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="mx-auto w-full max-w-[420px]">
            <Skeleton className="min-h-[320px] rounded-3xl" />
          </div>
        ))}

      {!isLoading &&
        data?.map((publication) => (
          <div
            key={publication.id}
            className="mx-auto flex w-full max-w-[420px] rounded-3xl border border-black-100 transition-colors duration-500 hover:bg-black-100"
          >
            <div className="flex w-full flex-col gap-y-4 overflow-hidden p-4">
              <div className="flex items-center justify-between gap-2 text-xs font-medium">
                <span className="text-accent-green">{SOURCE_LABEL[publication.source]}</span>
                {!!publication.type && (
                  <span className="text-white-500/60">{publication.type}</span>
                )}
              </div>

              <h3 className="line-clamp-3 font-medium leading-snug text-white-500">
                {publication.title}
              </h3>

              {!!publication.authors.length && (
                <p className="line-clamp-2 text-xs text-white-500/60">
                  {publication.authors.join('; ')}
                </p>
              )}

              {!!publication.description && (
                <p className="line-clamp-4 text-xs text-white-500/80">{publication.description}</p>
              )}

              <div className="mt-auto flex w-full items-center justify-between gap-2 pt-2">
                <span className="text-xs text-white-500/60">
                  {formatPublicationDate(publication.date)}
                </span>
                <Link
                  href={publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit space-x-2.5 rounded-sm bg-white-950 p-2.5 text-sm text-white-500"
                >
                  Read more
                  <ArrowRight className="inline h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Publications;
