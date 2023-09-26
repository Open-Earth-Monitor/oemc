import { FC, useMemo, useState } from 'react';

import { LinkedinShareButton, TwitterShareButton } from 'react-share';

import { usePathname, useSearchParams } from 'next/navigation';

import { HiOutlineShare } from 'react-icons/hi';
import { PiLinkSimpleBold } from 'react-icons/pi';
import { RiTwitterXLine, RiLinkedinFill } from 'react-icons/ri';

import { cn } from '@/lib/classnames';

import { CONTROL_BUTTON_STYLES } from '@/components/map/controls/constants';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import type { BookmarkControlProps } from './types';

export const ShareControl: FC<BookmarkControlProps> = ({
  bounds,
  className,
}: BookmarkControlProps) => {
  const pathname = usePathname();
  const params = useSearchParams();
  const urlCopy = useMemo(
    () =>
      !!params.get('layers')
        ? `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}?layers=${params.get('layers')}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`,
    [params, pathname]
  );

  const [urlCopyState, setURLCopyState] = useState(false);

  const handleCopy = async () => {
    try {
      // Copy text to the clipboard
      await window.navigator.clipboard.writeText(urlCopy.toString());

      // Set the "copied" state to true
      setURLCopyState(true);

      // Reset the "copied" state after 1 second
      setTimeout(() => {
        setURLCopyState(false);
      }, 1000);
    } catch (error) {
      // Handle clipboard copy error
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <HiOutlineShare
          className={cn({
            [CONTROL_BUTTON_STYLES.default]: true,
            'h-8 w-8 p-1': true,
            'hover:bg-gray-700 active:bg-gray-600': !!bounds,
            [className]: !!className,
          })}
        />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={-32}
        alignOffset={32}
        align="start"
        className={cn({
          'top-0 ml-1 flex w-fit items-center space-x-4 border border-brand-50 px-1 py-[3px]': true,
          'py-0': urlCopyState,
        })}
      >
        {urlCopyState && <p className="px-2 py-1.5 text-xs">Link copied to clipboard</p>}
        {!urlCopyState && (
          <>
            <button
              type="button"
              aria-label="copy url link"
              className={cn({
                'flex items-center space-x-2 text-secondary-500 disabled:cursor-default disabled:opacity-50':
                  true,
                'hover:bg-gray-700 active:bg-gray-600': !!bounds,
                [className]: !!className,
              })}
              onClick={() => void handleCopy()}
            >
              <PiLinkSimpleBold className="text-secondary-200 h-5 w-5" />
              <p className="py-1 text-xs">Copy URL link</p>
            </button>
            <div className="flex items-center space-x-2">
              <TwitterShareButton
                url={urlCopy}
                // TODO: update title
                title="Open Earth Monitor Cyberinfrastructure"
                aria-label="share twitter"
              >
                <RiTwitterXLine
                  className={cn({
                    'h-4 w-4 text-secondary-500 disabled:cursor-default disabled:opacity-50': true,
                    'hover:bg-gray-700 active:bg-gray-600': !!bounds,
                    [className]: !!className,
                  })}
                />
              </TwitterShareButton>

              <LinkedinShareButton
                url={urlCopy}
                // TODO: update title
                title="Open Earth Monitor Cyberinfrastructure"
                className="align-baseline"
                aria-label="share in linkedin"
              >
                <RiLinkedinFill
                  className={cn({
                    'h-5 w-6 text-secondary-500 disabled:cursor-default disabled:opacity-50': true,
                    'hover:bg-gray-700 active:bg-gray-600': !!bounds,
                    [className]: !!className,
                  })}
                />
              </LinkedinShareButton>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ShareControl;
