'use client';

import { cn } from '@/lib/classnames';
// export const metadata: Metadata = {
//   title: 'Hub - Open Earth Monitor Cyberinfrastructure',
//   description: '...',
// };

const Hub = ({ className }) => (
  <div
    className={cn({
      "relative w-screen bg-[url('/images/landing/hero.png')] bg-cover bg-right-bottom": true,
    })}
  >
    <div className="m-auto max-w-[1200px]">
      <h1
        className={cn({
          'whitespace-wrap max-w-[800px] font-satoshi text-8xl font-black': true,
          [className]: !!className,
        })}
      >
        Discover and empower with monitoring solutions.
      </h1>
    </div>
  </div>
);

export default Hub;
