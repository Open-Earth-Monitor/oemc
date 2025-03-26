'use client';

import SpinnerLoading from '@/components/loading';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex h-screen items-center justify-center">
      <SpinnerLoading />
    </div>
  );
}
