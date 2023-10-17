import { FC } from 'react';

import { LinkedinShareButton, TwitterShareButton } from 'react-share';

import { RiTwitterXLine, RiLinkedinFill } from 'react-icons/ri';

import { cn } from '@/lib/classnames';

import { CONTROL_BUTTON_STYLES, CONTROL_ICON_STYLES } from '@/components/map/controls/constants';

export const SocialMedia: FC<{ url: string }> = ({ url }) => (
  <div className="flex items-center space-x-2">
    <TwitterShareButton
      url={url}
      // TODO: update title
      title="Open Earth Monitor Cyberinfrastructure"
      aria-label="share twitter"
    >
      <div className={cn(CONTROL_BUTTON_STYLES.default, 'h-[28px] w-[28px]')}>
        <RiTwitterXLine className={CONTROL_ICON_STYLES.default} />
      </div>
    </TwitterShareButton>

    <LinkedinShareButton
      url={url}
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
);

export default SocialMedia;
