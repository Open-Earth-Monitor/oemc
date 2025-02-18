import { FC } from 'react';

import { useMediaQuery } from 'react-responsive';

import { Cross2Icon } from '@radix-ui/react-icons';

import { cn } from '@/lib/classnames';
import { tablet } from '@/lib/media-queries';

interface CompareGeolocationInfoPopupProps {
  onClick: () => void;
}

export const CompareGeolocationInfoPopup: FC<CompareGeolocationInfoPopupProps> = ({
  onClick,
}: CompareGeolocationInfoPopupProps) => {
  const isTablet = useMediaQuery(tablet);
  return (
    <div
      className={cn({
        'relative flex flex-col space-y-5 bg-brand-500 p-5 text-secondary-500': true,
      })}
    >
      <div className="flex w-full justify-between">
        <h3 className="text-2xl font-bold">Compare with another region.</h3>
        <button type="button" onClick={onClick}>
          <Cross2Icon className="h-3 w-3" />
        </button>
      </div>
      <p className="font-inter text-opacity-95">
        You can add one more region directly from the map,
        <br /> by clicking on it.
      </p>
    </div>
  );
};

export default CompareGeolocationInfoPopup;
