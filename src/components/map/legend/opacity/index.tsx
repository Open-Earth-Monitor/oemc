import { FC, useState, useCallback } from 'react';

import { MdOutlineOpacity } from 'react-icons/md';
import { useDebounceCallback } from 'usehooks-ts';

import { cn } from '@/lib/classnames';

import { Slider } from '@/components/slider';
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export const OpacitySetting: FC<{
  defaultValue?: number;
  onChange?: (opacityValue: number) => void;
}> = ({ defaultValue = 1, onChange = () => null }) => {
  const [isOpacityPopoverOpen, setOpacityPopoverOpen] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(
    !defaultValue && defaultValue !== 0 ? 1 : defaultValue
  );

  const handleOpacityVisibility = useCallback(() => {
    setOpacityPopoverOpen(!isOpacityPopoverOpen);
  }, [isOpacityPopoverOpen]);

  const debouncedChange = useDebounceCallback((nexOpacity: number) => {
    onChange(nexOpacity);
  }, 200);

  return (
    <Popover onOpenChange={handleOpacityVisibility}>
      <PopoverTrigger data-testid="layer-opacity-button">
        <MdOutlineOpacity
          className={cn({
            'h-5 w-5 text-gray-600 hover:text-secondary-500': true,
            'text-secondary-500': isOpacityPopoverOpen,
          })}
        />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={0}
        alignOffset={0}
        align="center"
        className={cn({
          'z-[60] w-[189px] rounded-3xl border border-secondary-900 px-3 py-3.5': true,
        })}
      >
        <div className="flex w-full flex-col space-y-2">
          <div
            data-testid="slider-current-value"
            className="m-auto w-[55px] rounded-xl border border-secondary-900 px-3 py-2 font-inter text-xs font-medium text-white"
          >
            {Math.round(opacity * 100)}%
          </div>
          <div className="relative py-1.5">
            <Slider
              onValueChange={(e) => setOpacity(e[0])}
              onValueCommit={(e) => debouncedChange(e[0])}
              defaultValue={[defaultValue]}
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
