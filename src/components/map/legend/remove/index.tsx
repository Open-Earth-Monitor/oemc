import { FC, useCallback } from 'react';

import { RxCross2 } from 'react-icons/rx';

import { cn } from '@/lib/classnames';

import { useSyncLayersSettings } from '@/hooks/sync-query';

export const RemoveLayer: FC<{ className?: string }> = ({ className }) => {
  const [, setLayers] = useSyncLayersSettings();

  const handleRemoveLayer = useCallback(() => {
    void setLayers(null);
  }, [setLayers]);

  return (
    <button
      data-testid="remove-layer"
      type="button"
      className={cn({
        'flex cursor-pointer items-center justify-center': true,
        [className]: !!className,
      })}
      onClick={handleRemoveLayer}
      aria-label="Toggle layer visibility"
    >
      <RxCross2 className="h-4 w-4 text-gray-600 hover:text-secondary-500" />
    </button>
  );
};

export default RemoveLayer;
