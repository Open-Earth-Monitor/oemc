import Image from 'next/image';

import { BiLogoMedium } from 'react-icons/bi';
import { RiTwitterXLine } from 'react-icons/ri';

import { cn } from '@/lib/classnames';

import { CONTROL_BUTTON_STYLES, CONTROL_ICON_STYLES } from '@/components/map/controls/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="relative flex w-full bg-brand-400 py-10 text-secondary-500 outline-none">
      <div className="m-auto flex w-full max-w-[1200px] space-x-14">
        <div className="flex items-center space-x-2">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/EarthMonitorOrg"
            title="Open-Earth-Monitor project"
            aria-label="Open-Earth-Monitor project twitter"
          >
            <div className={cn(CONTROL_BUTTON_STYLES.default, 'h-[28px] w-[28px]')}>
              <RiTwitterXLine className={CONTROL_ICON_STYLES.default} />
            </div>
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://opengeohub.medium.com/"
            title="OpenGeoHub project"
            className="align-baseline"
            aria-label="OpenGeoHub in Medium"
          >
            <div className={cn(CONTROL_BUTTON_STYLES.default, 'h-[28px] w-[28px]')}>
              <BiLogoMedium className={CONTROL_ICON_STYLES.default} />
            </div>
          </a>
        </div>
        <div className="flex flex-1 justify-start space-x-14">
          <div className="flex items-center space-x-2">
            <Image src="/images/landing/EU.svg" width={52} height={35} alt="eu" />

            <span className="block max-w-[376px] flex-wrap pr-2 text-[10px] leading-3">
              This project has received funding from the European Union&apos;s Horizon Europe
              research and innovation programme under{' '}
              <a
                href="https://cordis.europa.eu/project/id/101059548"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                grant agreement No. 101059548.
              </a>
            </span>
          </div>
          <div className="flex  space-x-4 text-xs font-medium">
            <div>Attributions</div>
            <div>Disclaimer</div>
            <div>Terms of Use</div>
            <div>Privacy Policy</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
