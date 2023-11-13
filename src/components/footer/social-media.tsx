'use client';

// import { BiLogoMedium } from 'react-icons/bi';
// import { IoLogoMastodon } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { RiTwitterXLine, RiGithubFill, RiLinkedinFill } from 'react-icons/ri';

import { cn } from '@/lib/classnames';

import { CONTROL_BUTTON_STYLES, CONTROL_ICON_STYLES } from './constants';

export const SocialMedia: React.FC = () => {
  return (
    <div className="flex items-center space-x-5">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/EarthMonitorOrg"
        title="Open-Earth-Monitor project"
        className="m-auto flex h-full items-center justify-center"
        aria-label="Open-Earth-Monitor project twitter"
        data-testid="twitter-link"
      >
        <div className={cn(CONTROL_BUTTON_STYLES)}>
          <RiTwitterXLine className={CONTROL_ICON_STYLES} />
        </div>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/opengeohub"
        title="OpenGeoHub Linkedin"
        className="m-auto flex h-full items-center justify-center"
        aria-label="OpenGeoHub Foundation Linkedin"
        data-testid="linkedin-link"
      >
        <div className={cn(CONTROL_BUTTON_STYLES)}>
          <RiLinkedinFill className={CONTROL_ICON_STYLES} />
        </div>
      </a>

      {/* TO - DO - add link */}
      {/* <a
      target="_blank"
      rel="noopener noreferrer"
      href=""
      title="Open Earth Monitor Cyberinfrastructure project"
      className="align-baseline"
      aria-label="OpenGeoHub in Mastodon"
      data-testid="mastodon-link"
    >
      <div className={cn(CONTROL_BUTTON_STYLES, 'h-[28px] w-[28px]')}>
        <IoLogoMastodon className={CONTROL_ICON_STYLES} />
      </div>
    </a> */}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/Open-Earth-Monitor"
        title="Open Earth Monitor Cyberinfrastructure project"
        className="m-auto flex h-full items-center justify-center"
        aria-label="Open Earth Monitor Cyberinfrastructure in GitHub"
        data-testid="github-link"
      >
        <div className={cn(CONTROL_BUTTON_STYLES)}>
          <RiGithubFill className={CONTROL_ICON_STYLES} />
        </div>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://av.tib.eu/publisher/OpenGeoHub_Foundation"
        title="OpenGeoHub Foundation"
        className="m-auto flex h-full items-center justify-center"
        aria-label="OpenGeoHub Foundation TIB"
        data-testid="tib-link"
      >
        <motion.div
          className={cn(
            'h-[25px] w-[25px] text-secondary-800 hover:text-secondary-500 active:bg-brand-200'
          )}
          whileHover="hover"
        >
          <svg
            width="25"
            height="19"
            viewBox="0 5 25 10"
            fill="none"
            className="h-[25px] w-[25px] fill-current text-secondary-800 hover:text-secondary-500 active:bg-brand-200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Group 1925">
              <g id="Group 1923">
                <motion.path
                  id="Vector"
                  d="M12.6047 18.8339H11.7515C11.4919 18.8339 11.2322 18.7226 11.0468 18.5C10.8984 18.3146 10.7871 18.092 10.7871 17.8324V1.6224C10.7871 1.39983 10.8984 1.14018 11.0468 0.991803C11.2322 0.76924 11.4919 0.657959 11.7515 0.657959H12.6047C12.8644 0.657959 13.1611 0.76924 13.3095 0.991803C13.4579 1.17727 13.532 1.39983 13.532 1.6224V17.8695C13.532 18.092 13.4579 18.3517 13.3095 18.5C13.1611 18.7226 12.9015 18.8339 12.6047 18.8339Z"
                  variants={{
                    initial: { fill: 'hsl(180, 3%, 35%)' },
                    hover: { fill: 'hsl(60, 100%, 95%)' },
                  }}
                />
                <motion.path
                  id="Vector_2"
                  d="M5.37182 18.8339H4.51866C4.25901 18.8339 3.99935 18.7226 3.81388 18.5C3.66551 18.3146 3.55422 18.092 3.55422 17.8324V3.43999H1.10604C0.883476 3.43999 0.62382 3.32871 0.475445 3.18033C0.252883 2.99486 0.141602 2.73521 0.141602 2.47555V1.6224C0.141602 1.32565 0.252883 1.06599 0.475445 0.880521C0.660914 0.732146 0.883476 0.657959 1.10604 0.657959H8.71025C8.93282 0.657959 9.19247 0.732146 9.34085 0.880521C9.56341 1.06599 9.67469 1.32565 9.67469 1.5853V2.43846C9.67469 2.69811 9.56341 2.95777 9.34085 3.14324C9.15538 3.29161 8.93282 3.4029 8.67316 3.3658H6.26207V17.7953C6.26207 18.0178 6.18788 18.2775 6.03951 18.4629C5.89113 18.7226 5.63147 18.8339 5.37182 18.8339Z"
                  variants={{
                    initial: { fill: 'hsl(180, 3%, 35%)' },
                    hover: { fill: 'hsl(60, 100%, 95%)' },
                  }}
                />
                <motion.path
                  id="Vector_3"
                  d="M20.2093 18.8339H16.6483C16.3886 18.8339 16.129 18.7226 15.9435 18.5C15.7951 18.3146 15.6838 18.092 15.6838 17.8324V1.6224C15.6838 1.32565 15.7951 1.06599 16.0177 0.880521C16.2031 0.732146 16.4257 0.657959 16.6483 0.657959H19.4303C20.0609 0.657959 20.6544 0.695053 21.285 0.76924C21.7672 0.806334 22.2865 0.954709 22.6946 1.21436C23.3622 1.5853 23.8816 2.1788 24.1783 2.88358C24.5121 3.62546 24.6605 4.40443 24.6605 5.22049C24.6605 6.55586 24.5121 7.5203 24.2154 8.15089C24.067 8.48474 23.8445 8.78149 23.5848 9.04114L23.4364 9.15242C23.9186 9.44917 24.2896 9.8572 24.5121 10.3765C24.8831 11.2668 25.0315 12.1941 24.9944 13.1585C24.9944 13.8262 24.9573 14.4568 24.8831 15.1245C24.8089 15.7922 24.5863 16.4228 24.2154 16.9792C23.8445 17.5727 23.3622 18.0549 22.7316 18.3517C21.9898 18.6855 21.0995 18.871 20.2093 18.8339ZM18.4659 16.089H20.098C20.4318 16.089 20.7657 16.0519 21.0995 15.9777C21.3592 15.9035 21.5446 15.7551 21.7301 15.5696C21.9527 15.31 22.064 15.0132 22.1381 14.7165C22.2494 14.1601 22.3236 13.6037 22.2865 13.0844C22.2865 12.6392 22.2494 12.2312 22.1011 11.8232C22.0269 11.5635 21.8414 11.341 21.6559 11.1555C21.4334 10.97 21.1366 10.8587 20.8399 10.8216C20.4318 10.7475 19.9867 10.7104 19.5787 10.7104H18.4659V16.089ZM18.4659 7.92833H19.6158C19.9496 7.92833 20.2835 7.89124 20.6544 7.85414C20.9141 7.81705 21.1366 7.74286 21.3221 7.59449C21.5446 7.40902 21.693 7.14936 21.7672 6.88971C21.9156 6.37039 21.9898 5.85108 21.9527 5.33177C21.9898 4.96083 21.9156 4.58989 21.7672 4.21896C21.6559 3.99639 21.5076 3.81093 21.3221 3.69964C21.0995 3.55127 20.8399 3.47708 20.5802 3.47708C20.2464 3.43999 19.8383 3.43999 19.4303 3.43999H18.4659V7.92833Z"
                  variants={{
                    initial: { fill: 'hsl(180, 3%, 35%)' },
                    hover: { fill: 'hsl(60, 100%, 95%)' },
                  }}
                />
              </g>
            </g>
          </svg>
        </motion.div>
      </a>
    </div>
  );
};

export default SocialMedia;
