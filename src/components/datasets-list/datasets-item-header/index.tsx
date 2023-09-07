'use client';

import { FC } from 'react';

import Info from '@/components/datasets-list/datasets-item-info';
import Icon from 'components/icon';
import DOWNLOAD_SVG from 'svgs/ui/download.svg?sprite';
import SHARE_SVG from 'svgs/ui/share.svg?sprite';

type DatasetsItemHeaderTypes = {
  layer_id: string;
  title: string;
  info?: string;
  downloadUrlBase?: string;
};
export const DatasetsItemHeader: FC<DatasetsItemHeaderTypes> = ({
  layer_id,
  title,
  downloadUrlBase,
}) => {
  // const downloadUrl = useMemo(() => {
  //   if (!filename || !downloadUrlBase) return null;
  //   return `${downloadUrlBase}/files/${filename.replace(
  //     '.*',
  //     `${range?.split(',')[0]}`
  //   )}?download=1`;
  // }, [filename, downloadUrlBase, range]);

  return (
    <div className="flex items-start justify-between">
      <h3 className="text-2xl">{title}</h3>
      <div className="flex items-baseline space-x-2 pt-2">
        {<Info layer_id={layer_id} />}

        {!!downloadUrlBase && (
          <a href={downloadUrlBase} target="_blank" rel="noopener noreferrer">
            <Icon icon={DOWNLOAD_SVG} className="h-6 w-6 text-gray-300" />
          </a>
        )}
        {<Icon icon={SHARE_SVG} className="h-6 w-6 text-gray-300" />}
      </div>
    </div>
  );
};

export default DatasetsItemHeader;
