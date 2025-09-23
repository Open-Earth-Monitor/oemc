import { FC } from 'react';

import { Cross2Icon } from '@radix-ui/react-icons';

import { cn } from '@/lib/classnames';

interface CompareGeolocationInfoPopupProps {
  onClick: () => void;
}

export const CompareGeolocationInfoPopup: FC<CompareGeolocationInfoPopupProps> = ({
  onClick,
}: CompareGeolocationInfoPopupProps) => {
  return (
    <div
      className={cn({
        'relative flex flex-col space-y-2 bg-black-500 p-4 text-secondary-500': true,
      })}
    >
      <div className="flex w-full items-start justify-between">
        <p className="font-inter text-sm text-opacity-95">
          You can add one more region directly from the map,
          <br /> by clicking on it.
        </p>
        <button type="button" onClick={onClick}>
          <Cross2Icon className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default CompareGeolocationInfoPopup;
