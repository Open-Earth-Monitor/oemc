import axios from 'axios';
import { Coordinate } from 'ol/coordinate';
import { TileWMS } from 'ol/source';

import { FeatureInfoResponse, NuqsData, PointDataset } from '../components/map/types';

export const getHistogramData = async (
  wmsNutsSource: TileWMS,
  coordinate: Coordinate,
  resolution: number,
  layerId: string
) => {
  try {
    const NUTS_layer = wmsNutsSource?.getFeatureInfoUrl(coordinate, resolution, 'EPSG:3857', {
      INFO_FORMAT: 'application/json',
      LAYERS: 'oem:NUTS_RG_01M_2021_3035',
    });

    if (!NUTS_layer) {
      console.error('Failed to generate the URL for NUTS layer.');
      return;
    }

    const NUTS_layer_response = await axios.get<FeatureInfoResponse>(NUTS_layer);
    const properties = NUTS_layer_response?.data?.features?.[0]?.properties;
    if (properties) {
      return {
        properties,
        nutsDataParams: {
          NUTS_ID: properties?.NUTS_ID as string,
          LAYER_ID: layerId,
        },
      };
    }
    return {};
  } catch {
    console.error('There had been an error while fetching NUTS layer data');
    return {};
  }
};

const isValidDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date.getTime());
};

// Labels do not always arrive as a plain date: they can be a range
// ("20140101-20140228"), in which case the start of the range is used. Anything
// the chart cannot parse as a date falls back to an ordinal x scale, so both
// histogram flavours normalise labels the same way.
export const normalizeHistogramLabel = (label: string) => {
  if (typeof label !== 'string' || isValidDate(label)) return label;

  const [rangeStart] = label.split('-');
  return isValidDate(rangeStart) ? rangeStart : label;
};

export const transformNuqsData = (data: NuqsData) => {
  return (
    data?.dataset?.reduce((acc, { label, avg, max, min }) => {
      if (avg === null || !Number.isFinite(avg)) return acc;

      return [
        ...acc,
        {
          x: normalizeHistogramLabel(label),
          y: avg,
          max: Number.isFinite(max) ? max : null,
          min: Number.isFinite(min) ? min : null,
        },
      ];
    }, []) || []
  );
};

export const transformPointData = (data: PointDataset[] | undefined) => {
  return (Array.isArray(data) ? data : []).reduce<{ x: string; y: number; unit: string }[]>(
    (acc, { label, value, unit }) => {
      if (value === null || !Number.isFinite(value)) return acc;

      acc.push({
        x: normalizeHistogramLabel(label),
        y: value,
        unit: unit ?? '',
      });

      return acc;
    },
    []
  );
};
