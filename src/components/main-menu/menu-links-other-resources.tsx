'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/classnames';

import { otherResources } from '@/components/main-menu/constants';

const OtherResourcesLinks = () => {
  const pathname = usePathname();

  return (
    <ul className="w-full font-medium">
      {otherResources.map(({ name, ...props }) => {
        const isActive = `/${pathname.split('/')[1]}` === props.href;
        return (
          <li key={props.href} className="w-full px-6 py-2.5 hover:bg-white-100">
            <Link {...props}>
              {isActive && <span>·</span>}
              <span>{name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default OtherResourcesLinks;
