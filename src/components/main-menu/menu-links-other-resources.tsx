'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { otherResources } from '@/components/main-menu/constants';

const OtherResourcesLinks = () => {
  const pathname = usePathname();

  return (
    <ul className="w-full px-6 py-5 font-medium">
      {otherResources.map(({ name, ...props }) => {
        const isActive = `/${pathname.split('/')[1]}` === props.href;

        return (
          <li key={props.href} className="w-full cursor-pointer px-6 py-2.5">
            <Link className="cursor-pointer" rel="noopener noreferrer" target="_blank" {...props}>
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
