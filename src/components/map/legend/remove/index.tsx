import { FC, useCallback } from 'react';

import { useRouter, usePathname } from 'next/navigation';

import { RxCross2 } from 'react-icons/rx';

import { cn } from '@/lib/classnames';

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
      <RxCross2 className="text-secondary-200 h-4 w-4" />
    </button>
  );
};

export default RemoveLayer;
