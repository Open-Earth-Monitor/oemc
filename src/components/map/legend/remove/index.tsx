import { FC, useCallback } from 'react';

import { useRouter, usePathname } from 'next/navigation';

import { cn } from '@/lib/classnames';

import Icon from 'components/icon';
import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

export const RemoveLayer: FC<{ className?: string }> = ({ className }) => {
  const pathname = usePathname();
  const router = useRouter();

  const onRemoveLayer = useCallback(() => {
    return router.replace(pathname);
  }, [pathname, router]);

  return (
    <button
      type="button"
      className={cn({ 'flex items-center justify-center': true, [className]: !!className })}
      onClick={onRemoveLayer}
      aria-label="Toggle layer visibility"
    >
      <Icon icon={CLOSE_SVG} className="h-3 w-3 text-secondary-900" />
    </button>
  );
};

export default RemoveLayer;
