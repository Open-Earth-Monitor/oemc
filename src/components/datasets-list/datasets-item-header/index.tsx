'use client';

import { useMemo } from 'react';

import Icon from 'components/icon';
import DOWNLOAD_SVG from 'svgs/ui/download.svg?sprite';
import INFO_SVG from 'svgs/ui/info.svg?sprite';
import SHARE_SVG from 'svgs/ui/share.svg?sprite';

export const DatasetsItemHeader = ({
  title,
  info,
  downloadUrlBase,
  filename,
  share,
  range,
}: {
  title: string;
  info?: string;
  downloadUrlBase?: string;
  filename?: string;
  share?: string;
  range?: string;
}) => {
  const downloadUrl = useMemo(() => {
    if (!filename || !downloadUrlBase) return null;
    return `${downloadUrlBase}/files/${filename.replace(
      '.*',
      `${range?.split(',')[0]}`
    )}?download=1`;
  }, [filename, downloadUrlBase, range]);

  return (
    <div className="flex items-start justify-between">
      <h3 className="text-2xl">{title}</h3>
      <div className="flex items-baseline space-x-2 pt-2">
        {info && <Icon icon={INFO_SVG} className="h-6 w-6 text-gray-300" />}
        {!!downloadUrl && (
          <a href={downloadUrl}>
            <Icon icon={DOWNLOAD_SVG} className="h-6 w-6 text-gray-300" />
          </a>
        )}
        {share && <Icon icon={SHARE_SVG} className="h-6 w-6 text-gray-300" />}
      </div>
    </div>
  );
};

export default DatasetsItemHeader;
