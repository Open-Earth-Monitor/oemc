import { Coordinate } from 'ol/coordinate';
import { TileWMS } from 'ol/source';
import { FeatureInfoResponse, NuqsData } from '../components/map/types';
import axios from 'axios';

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

export const transformNuqsData = (data: NuqsData) => {
  return (
    data?.dataset?.reduce((acc, { label, avg, max, min }) => {
      if (Number.isNaN(Number(avg))) return acc;
      let date = label;
      if (!isValidDate(label)) {
        const range = label.split('-');
        if (isValidDate(range[0])) {
          date = range[0];
        }
      }

      return [
        ...acc,
        {
          x: date,
          y: avg,
          max,
          min,
        },
      ];
    }, []) || []
  );
};
