import { FC, useCallback } from 'react';

import { LuX } from 'react-icons/lu';

import { cn } from '@/lib/classnames';

import { useSyncLayersSettings, useSyncCompareLayersSettings } from '@/hooks/sync-query';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const RemoveLayer: FC<{ className?: string }> = ({ className }) => {
  const [, setLayers] = useSyncLayersSettings();
  const [, setCompareLayers] = useSyncCompareLayersSettings();

  const handleRemoveLayer = useCallback(() => {
    void setLayers(null);
    void setCompareLayers(null);
  }, [setLayers, setCompareLayers]);

  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
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
          <LuX className="h-6 w-6 text-gray-600 hover:text-secondary-500" />
        </button>
      </TooltipTrigger>
      <TooltipContent sideOffset={4} side="top" align="center">
        <div className="text-sm">Remove layer</div>
      </TooltipContent>
    </Tooltip>
  );
};

export default RemoveLayer;
