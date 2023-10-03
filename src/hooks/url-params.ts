import { useMemo } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { LayersSearchParam, SearchParamsTypes } from '@/types/url-params';

export function useURLayerParams() {
  const params = useSearchParams();
  const layerParams = params.get('layers');

  const layersParamsParsed = useMemo<null | LayersSearchParam[]>(() => {
    if (layerParams === null) return null;
    else return JSON.parse(layerParams) as LayersSearchParam[];
  }, [layerParams]);
  const layerId = useMemo<LayersSearchParam['id']>(
    () => layersParamsParsed?.[0]?.id,
    [layersParamsParsed]
  );
  const layerOpacity = useMemo<LayersSearchParam['opacity']>(
    () => layersParamsParsed?.[0]?.opacity,
    [layersParamsParsed]
  );

  const date = useMemo<LayersSearchParam['date']>(
    () => layersParamsParsed?.[0]?.date,
    [layersParamsParsed]
  );

  return {
    layerId,
    layerOpacity,
    date,
  };
}

export function useURLParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const layerParams = searchParams.get('layers');

  const layersParamsParsed = useMemo<null | LayersSearchParam[]>(() => {
    return layerParams ? (JSON.parse(layerParams) as LayersSearchParam[]) : null;
  }, [layerParams]);

  const updateSearchParam = (newSearchParams: Partial<SearchParamsTypes>) => {
    const nextSearchParams = new URLSearchParams();
    const initialSearchParams = new URLSearchParams(searchParams.toString());

    // Copy initial search params
    initialSearchParams.forEach((value, key) => {
      nextSearchParams.set(key, value);
    });

    if (newSearchParams?.layers && layersParamsParsed === null) {
      nextSearchParams.set('layers', JSON.stringify(newSearchParams.layers));
    } else {
      nextSearchParams.set(
        'layers',
        JSON.stringify([{ ...layersParamsParsed?.[0], ...newSearchParams.layers[0] }])
      );
    }

    router.replace(`${pathname}?${nextSearchParams.toString()}`);
  };

  const removeSearchParam = (key: string) => {
    const nextSearchParams = new URLSearchParams();
    const initialSearchParams = new URLSearchParams(searchParams.toString());

    // Copy initial search params
    initialSearchParams.forEach((value, key) => {
      nextSearchParams.set(key, value);
    });

    nextSearchParams.delete(key);

    router.replace(`${pathname}?${nextSearchParams.toString()}`);
  };

  return { updateSearchParam, removeSearchParam };
}
