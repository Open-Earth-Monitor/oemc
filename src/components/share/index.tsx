import { FC, useMemo, useState } from 'react';

import { LinkedinShareButton, TwitterShareButton } from 'react-share';

import { usePathname, useSearchParams } from 'next/navigation';

import { HiOutlineShare } from 'react-icons/hi';
import { PiLinkSimpleBold } from 'react-icons/pi';
import { RiTwitterXLine, RiLinkedinFill } from 'react-icons/ri';

import { cn } from '@/lib/classnames';

import { CONTROL_BUTTON_STYLES, CONTROL_ICON_STYLES } from '@/components/map/controls/constants';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export const ShareControl: FC = () => {
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
      }, 2000);
    } catch (error) {
      // Handle clipboard copy error
      console.error('Error copying to clipboard:', error);
    }
  };
  return (
    <Popover>
      <PopoverTrigger className={CONTROL_BUTTON_STYLES.default}>
        <HiOutlineShare className={CONTROL_ICON_STYLES.default} />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={-34}
        alignOffset={34}
        align="start"
        className="ml-1.5 flex h-[34px] w-fit items-center border border-brand-50 p-0.5"
      >
        {urlCopyState && <p className="px-2 py-1.5 text-xs">Link copied to clipboard</p>}
        {!urlCopyState && (
          <>
            <button
              type="button"
              aria-label="copy url link"
              className={cn(CONTROL_BUTTON_STYLES.default, 'flex h-[28px] w-auto space-x-2 px-2')}
              onClick={() => void handleCopy()}
            >
              <PiLinkSimpleBold className={CONTROL_ICON_STYLES.default} />
              <span className="text-xs">Copy URL link</span>
            </button>
            <div className="flex items-center space-x-2">
              <TwitterShareButton
                url={urlCopy}
                // TODO: update title
                title="Open Earth Monitor Cyberinfrastructure"
                aria-label="share twitter"
              >
                <div className={cn(CONTROL_BUTTON_STYLES.default, 'h-[28px] w-[28px]')}>
                  <RiTwitterXLine className={CONTROL_ICON_STYLES.default} />
                </div>
              </TwitterShareButton>

              <LinkedinShareButton
                url={urlCopy}
                // TODO: update title
                title="Open Earth Monitor Cyberinfrastructure"
                className="align-baseline"
                aria-label="share in linkedin"
              >
                <div className={cn(CONTROL_BUTTON_STYLES.default, 'h-[28px] w-[28px]')}>
                  <RiLinkedinFill className={CONTROL_ICON_STYLES.default} />
                </div>
              </LinkedinShareButton>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};
export default ShareControl;
