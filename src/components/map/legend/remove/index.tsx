import { FC, useCallback } from 'react';

import { LuX } from 'react-icons/lu';

import { cn } from '@/lib/classnames';

import { useSyncLayersSettings, useSyncCompareLayersSettings } from '@/hooks/sync-query';

import { IconTooltip } from '@/components/ui/tooltip';

export const RemoveLayer: FC<{ className?: string }> = ({ className }) => {
  const [, setLayers] = useSyncLayersSettings();
  const [, setCompareLayers] = useSyncCompareLayersSettings();

  const handleRemoveLayer = useCallback(() => {
    void setLayers(null);
    void setCompareLayers(null);
  }, [setLayers, setCompareLayers]);

  return (
    <IconTooltip label="Remove layer">
      <button
        data-testid="remove-layer"
        type="button"
        className={cn({
          'flex cursor-pointer items-center justify-center': true,
          [className]: !!className,
        })}
        onClick={handleRemoveLayer}
        aria-label="Remove layer"
      >
        <LuX className="h-6 w-6 text-gray-600 transition-colors hover:text-secondary-500" />
      </button>
    </IconTooltip>
  );
};

export default RemoveLayer;
