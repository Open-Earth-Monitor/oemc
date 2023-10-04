import { FC, useEffect, useState, useCallback } from 'react';

import { MdOutlineOpacity } from 'react-icons/md';
import { useDebounce } from 'usehooks-ts';

import { cn } from '@/lib/classnames';

import { useURLayerParams, useURLParams } from '@/hooks/url-params';

import { Slider } from '@/components/slider';
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export const OpacitySetting: FC = () => {
  const { updateSearchParam } = useURLParams();
  const { layerId, layerOpacity, date } = useURLayerParams();

  const [isOpacityPopoverOpen, setOpacityPopoverOpen] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(layerOpacity || 1);
  const debouncedOpacity = useDebounce<number>(opacity, 300);

  const handleOpacityVisibility = useCallback(
    () => setOpacityPopoverOpen(!isOpacityPopoverOpen),
    [isOpacityPopoverOpen]
  );

  const handleChange = useCallback((e: number[]) => setOpacity(e[0]), []);

  useEffect(() => {
    updateSearchParam({ layers: [{ id: layerId, opacity, date }] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedOpacity]);

  return (
    <Popover onOpenChange={handleOpacityVisibility}>
      <PopoverTrigger data-testid="layer-opacity-button">
        <MdOutlineOpacity
          className={cn({
            'h-4 w-4 text-gray-600 hover:text-secondary-500': true,
            'text-secondary-500': isOpacityPopoverOpen,
          })}
        />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={0}
        alignOffset={0}
        align="center"
        className="w-[189px] rounded-3xl border border-secondary-900 p-3"
      >
        <div className="flex w-full flex-col space-y-2">
          <div
            data-testid="slider-current-value"
            className="m-auto w-[55px] rounded-xl border border-secondary-900 p-3 font-inter text-xs font-medium text-white"
          >
            {Math.round(opacity * 100)}%
          </div>
          <div className="relative py-1.5">
            <Slider
              onValueChange={handleChange}
              value={[opacity]}
              min={0}
              max={1}
              step={0.01}
              data-testid="layer-opacity-slider"
            />
          </div>
        </div>
        <PopoverArrow className="text-brand-50" />
      </PopoverContent>
    </Popover>
  );
};

export default OpacitySetting;
