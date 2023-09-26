import { FC, useEffect, useState, useCallback } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { MdOutlineOpacity } from 'react-icons/md';

import { cn } from '@/lib/classnames';

import { Slider } from '@/components/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useURLayerParams } from '@/hooks';

export const OpacitySetting: FC = () => {
  const [isOpenOpacitySliderVisibility, setOpacitySliderVisibility] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(1);
  const handleOpacityVisibility = () => setOpacitySliderVisibility(!isOpenOpacitySliderVisibility);
  const router = useRouter();
  const pathname = usePathname();

  const { layerId, layerOpacity } = useURLayerParams();

  const handleChange = useCallback(
    (e: number[]) => {
      // Encode the layers object as a JSON string
      const opacityValue = e[0] / 100;
      const encodedLayers = decodeURIComponent(
        JSON.stringify({
          id: layerId,
          opacity: opacityValue,
        })
      );

      // Construct the URL
      const url = `${pathname}/?layers=[${encodedLayers}]`;
      return router.replace(url);
    },
    [pathname, router, layerId]
  );

  useEffect(() => {
    setOpacity(layerOpacity);
  }, [layerOpacity]);

  return (
    <Popover onOpenChange={handleOpacityVisibility}>
      <PopoverTrigger data-testid="layer-opacity-button">
        <MdOutlineOpacity
          className={cn({
            'h-5 w-5 text-secondary-900 hover:text-secondary-500': true,
            'text-secondary-500': isOpenOpacitySliderVisibility,
          })}
        />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={10}
        alignOffset={-10}
        align="center"
        className="w-48 rounded-3xl border border-secondary-900 p-3"
      >
        <Slider
          onValueChange={handleChange}
          defaultValue={[100]}
          value={[opacity * 100]}
          min={0}
          max={100}
          step={1}
          data-testid="layer-opacity-slider"
        />
      </PopoverContent>
    </Popover>
  );
};

export default OpacitySetting;
