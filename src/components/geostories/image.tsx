'use client';

import { useState } from 'react';

import Image, { type ImageProps } from 'next/image';

import { getGeostoryFallbackImageUrl, getGeostoryImageUrl } from '@/hooks/geostories';

type GeostoryImageProps = Omit<ImageProps, 'src'> & { geostoryId: string | number };

/**
 * Geostory cover from the media API. A URL is always built, but the API has no
 * image for some geostories, so on load error swap to the local cover.
 */
const GeostoryImage = ({ geostoryId, alt, onError, ...props }: GeostoryImageProps) => {
  const [failed, setFailed] = useState(false);

  return (
    <Image
      {...props}
      alt={alt}
      src={failed ? getGeostoryFallbackImageUrl(geostoryId) : getGeostoryImageUrl(geostoryId)}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
    />
  );
};

export default GeostoryImage;
