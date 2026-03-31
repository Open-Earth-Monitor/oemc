'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { otherResources } from '@/components/main-menu/constants';

const OtherResourcesLinks = () => {
  const pathname = usePathname();

  return (
    <ul className="flex w-full flex-col gap-1 px-6 py-5 font-medium">
      {otherResources.map(({ name, ...props }) => {
        const isActive = `/${pathname.split('/')[1]}` === props.href;

        return (
          <li key={props.href} className="group flex w-full cursor-pointer">
            <Link
              className="flex cursor-pointer items-center space-x-2 rounded-[8px] px-4 py-2 font-medium transition-colors hover:bg-black-500 hover:bg-black-500/10 hover:text-white-500"
              {...props}
            >
              {isActive && (
                <div className="h-2 w-2 rounded-full bg-black-500 group-hover:bg-white-500" />
              )}
              <span>{name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default OtherResourcesLinks;
