'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { LuArrowRight, LuX } from 'react-icons/lu';

import { cn } from '@/lib/classnames';

import type { Geostory } from '@/types/geostories';

import { CATEGORIES_COLORS, type CategoryId } from '@/constants/categories';

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

type Tab = 'overview' | 'use-cases';

type GeostoryDialogProps = {
  geostory: Geostory | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function getCategoryColor(theme: CategoryId | string): string {
  return CATEGORIES_COLORS[theme as CategoryId]?.base ?? CATEGORIES_COLORS.Unknown.base;
}

export default function GeostoryDialog({ geostory, open, onOpenChange }: GeostoryDialogProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  if (!geostory) return null;

  const color = getCategoryColor(geostory.theme);
  const firstPublication = geostory.publications?.[0];
  const doi = geostory.use_case_link?.[0]?.doi?.[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        scrollArea={false}
        overlay={true}
        className="!max-h-[400px] flex-row overflow-hidden rounded-none bg-brand-500 p-0 sm:max-w-[507px] md:max-w-[507px]"
      >
        <DialogTitle className="sr-only">{geostory.title}</DialogTitle>
        <DialogDescription className="sr-only">{geostory.description}</DialogDescription>

        {/* Left panel */}
        <div className="flex w-[60%] flex-col gap-3 p-5">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-white font-medium">Geostory</span>
            <span className="text-white-800">|</span>
            <span className="font-medium" style={{ color }}>
              {geostory.theme}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-satoshi text-lg font-bold leading-tight" style={{ color }}>
            {geostory.title}
          </h3>

          {/* Publication link */}
          {firstPublication?.url && firstPublication?.title && (
            <a
              href={firstPublication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white truncate text-xs text-white-500 underline"
            >
              {firstPublication.title}
            </a>
          )}

          {/* DOI */}
          {doi && (
            <span className="bg-white/10 inline-block w-fit rounded-full px-2 py-0.5 text-[10px] text-white-500">
              DOI: {doi}
            </span>
          )}

          {/* Tab pills */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                activeTab === 'overview'
                  ? 'text-brand-500'
                  : 'border border-white-800 text-white-500 hover:border-white-500'
              )}
              style={activeTab === 'overview' ? { backgroundColor: color } : undefined}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('use-cases')}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                activeTab === 'use-cases'
                  ? 'text-brand-500'
                  : 'border border-white-800 text-white-500 hover:border-white-500'
              )}
              style={activeTab === 'use-cases' ? { backgroundColor: color } : undefined}
            >
              Use Cases
            </button>
          </div>

          {/* Scrollable content */}
          <ScrollArea className="min-h-0 flex-1">
            {activeTab === 'overview' && (
              <p className="pr-2 text-xs leading-relaxed text-white-500">{geostory.description}</p>
            )}
            {activeTab === 'use-cases' && (
              <ul className="space-y-2 pr-2">
                {geostory.use_case_link?.length > 0 ? (
                  geostory.use_case_link.map((uc, i) => (
                    <li key={i}>
                      {uc.url ? (
                        <a
                          href={uc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white text-xs text-white-500 underline"
                        >
                          {uc.title}
                        </a>
                      ) : (
                        <span className="text-xs text-white-500">{uc.title}</span>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-white-800">No use cases available.</li>
                )}
              </ul>
            )}
          </ScrollArea>
        </div>

        {/* Right panel — image */}
        <div className="relative min-h-[300px] w-[40%]">
          <Image
            src={`/images/geostories/${geostory.id}.jpg`}
            alt={geostory.title}
            fill
            sizes="200px"
            className="object-cover"
          />
          <div className="bg-black/20 absolute inset-0" />
        </div>

        {/* Close button */}
        <DialogClose className="hover:text-white absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-brand-500/80 px-3 py-1 text-xs text-white-500 opacity-100 backdrop-blur-sm">
          <span>Close</span>
          <LuX className="h-5 w-5 rounded-full border p-1" />
        </DialogClose>

        {/* Navigate arrow */}
        <Link
          href={`/explore/geostory/${geostory.id}`}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full text-brand-500 transition-opacity hover:opacity-80"
          style={{ backgroundColor: color }}
        >
          <LuArrowRight className="h-4 w-4" />
        </Link>
      </DialogContent>
    </Dialog>
  );
}
