'use client';

import { FC } from 'react';

import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import cn from '@/lib/classnames';

import { buttonVariants } from '@/components/ui/button';

const BackToMonitorsAndGeostories: FC = () => {
  return (
    <Link href="/explore" className="group/back z-10 flex items-center gap-2 pb-4">
      <div
        className={cn(
          buttonVariants({ variant: 'background' }),
          'rounded-full p-2.5 group-hover/back:bg-white-500 group-hover/back:text-black-500'
        )}
      >
        <ArrowLeft className="h-6 w-6" />
      </div>

      <span className="font-medium">All Monitors & Geostories</span>
    </Link>
  );
};

export default BackToMonitorsAndGeostories;
