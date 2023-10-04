import { FC, useCallback } from 'react';

import { RxCross2 } from 'react-icons/rx';

import { cn } from '@/lib/classnames';

import { useURLParams } from '@/hooks/url-params';

export const RemoveLayer: FC<{ className?: string }> = ({ className }) => {
  const { removeSearchParam } = useURLParams();

  const onRemoveLayer = useCallback(() => {
    removeSearchParam('layers');
  }, [removeSearchParam]);

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
      <RxCross2 className="h-4 w-4 text-gray-600 hover:text-secondary-500" />
    </button>
  );
};

export default RemoveLayer;
