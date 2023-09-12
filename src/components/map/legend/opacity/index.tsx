import { FC, useState, useCallback, useMemo } from 'react';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import { cn } from '@/lib/classnames';

import type { LayerSettingTypes } from '@/types/layers';

import { Slider } from '@/components/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Icon from 'components/icon';
import OPACITY_SVG from 'svgs/map/opacity.svg?sprite';
export const OpacitySetting: FC = () => {
  const [isOpenOpacitySliderVisibility, setOpacitySliderVisibility] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(1);
  const handleOpacityVisibility = () => setOpacitySliderVisibility(!isOpenOpacitySliderVisibility);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const layersParams = params.get('layers');
  const layersParamsParsed = useMemo<null | LayerSettingTypes[]>(() => {
    if (layersParams === null) return null;
    else return JSON.parse(layersParams) as LayerSettingTypes[];
  }, [layersParams]);

  const handleChange = useCallback(
    (e: number[]) => {
      // Create the layers object
      // Encode the layers object as a JSON string
      const opacityValue = e[0] / 100;
      const encodedLayers = decodeURIComponent(
        JSON.stringify({
          id: layersParamsParsed?.[0]?.id,
          opacity: opacityValue,
        })
      );

      // Construct the URL
      setOpacity(opacityValue);
      const url = `${pathname}/?layers=[${encodedLayers}]`;
      return router.replace(url);
    },
    [setOpacity, pathname, router, layersParamsParsed]
  );
  return (
    <Popover onOpenChange={handleOpacityVisibility}>
      <PopoverTrigger>
        <Icon
          icon={OPACITY_SVG}
          className={cn({
            'h-4 w-4 text-secondary-900 hover:text-secondary-500': true,
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
        />
      </PopoverContent>
    </Popover>
  );
};

export default OpacitySetting;
