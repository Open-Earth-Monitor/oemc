import { FC, useCallback } from 'react';

import { LuX } from 'react-icons/lu';

import { cn } from '@/lib/classnames';

import { useSyncLayersSettings, useSyncCompareLayersSettings } from '@/hooks/sync-query';

export const RemoveLayer: FC<{ className?: string }> = ({ className }) => {
  const [, setLayers] = useSyncLayersSettings();
  const [, setCompareLayers] = useSyncCompareLayersSettings();

  const handleRemoveLayer = useCallback(() => {
    void setLayers(null);
    void setCompareLayers(null);
  }, [setLayers, setCompareLayers]);

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
      <LuX className="h-6 w-6 text-gray-600 hover:text-secondary-500" />
    </button>
  );
};

export default RemoveLayer;
