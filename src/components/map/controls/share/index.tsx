'use client';

import { FC, useCallback, useState } from 'react';

import { LinkedinShareButton, TwitterShareButton } from 'react-share';

import { HiOutlineShare } from 'react-icons/hi';
import { PiLinkSimpleBold } from 'react-icons/pi';
import { RiTwitterXLine, RiLinkedinFill } from 'react-icons/ri';
import { useCopyToClipboard } from 'usehooks-ts';

import { cn } from '@/lib/classnames';

import { CONTROL_BUTTON_STYLES, CONTROL_ICON_STYLES } from '@/components/map/controls/constants';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import type { MobileProps } from '../types';

const TIMEOUT_RESET_COPY_STATE = 3000;

const ShareControl: FC<MobileProps> = ({ isMobile }: MobileProps) => {
  const [hasCopiedText, setHasCopiedText] = useState(false);
  const [, copyToClipboard] = useCopyToClipboard();
  const urlCopy = window.location.href;

  const handleCopy = useCallback(async () => {
    try {
      // Copy text to the clipboard
      await copyToClipboard(urlCopy);
      setHasCopiedText(true);
      setTimeout(() => {
        setHasCopiedText(false);
      }, TIMEOUT_RESET_COPY_STATE + 100);
    } catch (error) {
      setHasCopiedText(false);
      // Handle clipboard copy error
      console.error('Error copying to clipboard:', error);
    }
  }, [copyToClipboard, urlCopy]);

  return (
    <Popover>
      <PopoverTrigger data-testid="share-tool-trigger" asChild>
        <button
          type="button"
          aria-label="share tool"
          className={isMobile ? CONTROL_BUTTON_STYLES.mobile : CONTROL_BUTTON_STYLES.default}
        >
          <HiOutlineShare size={22} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={isMobile ? -48 : -34}
        align="end"
        className={cn({
          'ml-1.5 flex h-[34px] w-fit items-center border border-brand-50 p-0.5': true,
          'z-[600] ml-0 h-[48px] rounded-none': isMobile,
        })}
        hideWhenDetached={true}
      >
        {hasCopiedText && (
          <p data-testid="copy-link-success" className="px-2 py-1.5 text-xs text-secondary-500">
            Link copied to clipboard
          </p>
        )}
        {!hasCopiedText && (
          <>
            <button
              type="button"
              data-testid="copy-url-link"
              aria-label="copy url link"
              className={cn({
                [CONTROL_BUTTON_STYLES.mobile]: isMobile,
                [CONTROL_BUTTON_STYLES.default]: !isMobile,
                'z-[1000] flex h-[28px] w-auto space-x-2 px-2': true,
              })}
              onClick={handleCopy}
            >
              <PiLinkSimpleBold className={CONTROL_ICON_STYLES.default} />
              <span data-testid="copy-message" className="text-xs">
                Copy URL link
              </span>
            </button>
            <div className="flex items-center space-x-2">
              <TwitterShareButton
                url={urlCopy}
                title="Open Earth Monitor Cyberinfrastructure"
                aria-label="share in twitter"
                data-testid="share-twitter-button"
              >
                <div className={cn(CONTROL_BUTTON_STYLES.default, 'h-[28px] w-[28px]')}>
                  <RiTwitterXLine className={CONTROL_ICON_STYLES.default} />
                </div>
              </TwitterShareButton>

              <LinkedinShareButton
                url={urlCopy}
                title="Open Earth Monitor Cyberinfrastructure"
                className="align-baseline"
                aria-label="share in linkedin"
                data-testid="share-linkedin-button"
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
