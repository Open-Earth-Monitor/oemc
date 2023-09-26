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
      data-testid="remove-layer"
      type="button"
      className={cn({
        'flex cursor-pointer items-center justify-center': true,
        [className]: !!className,
      })}
      onClick={onRemoveLayer}
      aria-label="Toggle layer visibility"
    >
      <RxCross2 className="h-6 w-6 text-brand-50 hover:text-secondary-500" />
    </button>
  );
};

export default RemoveLayer;
