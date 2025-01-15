import { motion } from 'framer-motion';

import { cn } from '@/lib/classnames';
import { useAtom } from 'jotai';

import { regionsLayerVisibilityAtom, histogramLayerLeftVisibilityAtom } from '@/app/store';
import { CONTROL_BUTTON_STYLES } from '@/components/map/controls/constants';
import { TooltipPortal } from '@radix-ui/react-tooltip';

import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const CompareRegionsStatistics = ({
  isMobile,
  onClick,
}: {
  isMobile?: boolean;
  onClick: () => void;
}) => {
  const [isRegionsLayerActive] = useAtom(regionsLayerVisibilityAtom);
  const [leftLayerHistogramVisibility, setLeftLayerHistogramVisibility] = useAtom(
    histogramLayerLeftVisibilityAtom
  );
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          initial="initial"
          whileHover="hover"
          className={cn({
            'group bg-brand-500': true,
            'p-4': isMobile,
            [CONTROL_BUTTON_STYLES.mobile]: isMobile,
            [CONTROL_BUTTON_STYLES.default]: !isMobile,
          })}
          onClick={onClick}
          // disabled={leftLayerHistogramVisibility && !isRegionsLayerActive}
        >
          {
            <svg
              width={24}
              height={24}
              viewBox="0, 0, 24, 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.5852 14.7002H16.4992C16.0218 14.7002 15.564 14.8898 15.2264 15.2274C14.8889 15.565 14.6992 16.0228 14.6992 16.5002V20.5862"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-current text-secondary-500 group-hover:text-[#09131D]"
              />
              <path
                d="M7.5 4.20581V5.69981C7.5 6.4159 7.78446 7.10265 8.29081 7.609C8.79716 8.11535 9.48392 8.39981 10.2 8.39981C10.6774 8.39981 11.1352 8.58945 11.4728 8.92702C11.8104 9.26458 12 9.72242 12 10.1998C12 11.1898 12.81 11.9998 13.8 11.9998C14.2774 11.9998 14.7352 11.8102 15.0728 11.4726C15.4104 11.135 15.6 10.6772 15.6 10.1998C15.6 9.20981 16.41 8.39981 17.4 8.39981H20.253"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-current text-secondary-500 group-hover:text-[#09131D]"
              />
              <path
                d="M11.0999 20.9551V17.4001C11.0999 16.9227 10.9103 16.4649 10.5727 16.1273C10.2351 15.7897 9.77731 15.6001 9.29992 15.6001C8.82253 15.6001 8.3647 15.4105 8.02713 15.0729C7.68956 14.7353 7.49992 14.2775 7.49992 13.8001V12.9001C7.49992 12.4227 7.31028 11.9649 6.97271 11.6273C6.63515 11.2897 6.17731 11.1001 5.69992 11.1001H3.04492"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-current text-secondary-500 group-hover:text-[#09131D]"
              />
              <path
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-current text-secondary-500 group-hover:text-[#09131D]"
              />
            </svg>
          }
        </motion.button>
      </TooltipTrigger>

      <TooltipPortal>
        <TooltipContent side="left" align="center">
          <div className="text-sM">
            {!isRegionsLayerActive && !leftLayerHistogramVisibility && 'Enable the regions layer'}
            {!isRegionsLayerActive &&
              leftLayerHistogramVisibility &&
              'Activate the regions layer to view statistics based on the selected region'}
            {isRegionsLayerActive && 'Disable regions layer'}
          </div>
          <TooltipArrow className="fill-current" width={10} height={5} />
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  );
};

export default CompareRegionsStatistics;
