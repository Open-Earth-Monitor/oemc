import Image from 'next/image';

import { useAtom, useSetAtom } from 'jotai';
import { LuInfo, LuX } from 'react-icons/lu';

import { histogramVisibilityAtom, regionsBannerVisibilityAtom } from '@/app/store';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  IconTooltip,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const RegionsBanner: React.FC = () => {
  const [isHistogramActive] = useAtom(histogramVisibilityAtom);
  const setRegionsBannerVisibility = useSetAtom(regionsBannerVisibilityAtom);

  const handleClickClose = () => {
    setRegionsBannerVisibility(false);
  };

  return (
    <section
      aria-label="Regions analysis help"
      className="fixed bottom-0 -mx-6 flex max-w-[420px] items-start justify-between space-x-2 rounded-t-2xl bg-white-500 px-4 py-2 text-sm text-black-500"
    >
      {!isHistogramActive && (
        <Image
          src="/svgs/region.svg"
          alt=""
          aria-hidden="true"
          width={56}
          height={52}
          className="mx-auto -mt-4 mb-2 shrink-0"
        />
      )}

      {isHistogramActive && (
        <Image
          src="/svgs/region-comparison.svg"
          alt=""
          aria-hidden="true"
          width={80}
          height={64}
          className="mx-auto -mt-4 mb-2 shrink-0"
        />
      )}

      <p id="regions-banner-description" className="pr-4">
        Click on the map to select a point or a region and{' '}
        <span className="font-bold">analyze</span> it based on the active layer.
      </p>

      <div className="flex items-center gap-2">
        <Dialog>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <button
                  type="button"
                  aria-label="Open help about analyzing regions"
                  aria-describedby="regions-banner-description"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-green"
                >
                  <LuInfo
                    aria-hidden="true"
                    className="h-6 w-6 text-black-100 transition-colors hover:text-black-500"
                  />
                </button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent side="top">
                <div className="text-sm">How to analyze locations?</div>
                <TooltipArrow />
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>

          <DialogContent
            role="dialog"
            aria-labelledby="regions-help-title"
            className="max-h-[400px]"
          >
            <div className="space-y-4">
              <h2 id="regions-help-title" className="text-lg font-bold text-white-500">
                How to analyze locations?
              </h2>

              <p className="text-sm text-white-500">
                To <span className="font-bold">analyze a point</span>, click on the map where a data
                layer is available. Once selected, you can explore the available data layers and
                gain insights for that specific location.
              </p>

              <p className="text-sm text-white-500">
                To <span className="font-bold">analyze a region</span>, first enable the Regions
                layer. You can find it on the right side of the map inside Map settings. Once the
                layer is active, click on a region to select it and view its data.
              </p>

              <p className="text-sm text-white-500">
                To <span className="font-bold">compare different regions</span>, select a region on
                the map. Once a region is selected, clicking on another region will add it to the
                comparison.
              </p>

              <p className="text-sm text-white-500">
                Remember, the available data layers may vary depending on the region you select, so
                feel free to explore and discover the insights hidden within the map.
              </p>
            </div>
          </DialogContent>
        </Dialog>

        <IconTooltip label="Dismiss">
          <button
            type="button"
            aria-label="Close regions help banner"
            className="group/dismiss flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-black-100 transition-colors hover:border-black-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-green"
            onClick={handleClickClose}
          >
            <LuX
              aria-hidden="true"
              className="h-3.5 w-3.5 text-black-100 transition-colors group-hover/dismiss:text-black-500"
            />
          </button>
        </IconTooltip>
      </div>
    </section>
  );
};

export default RegionsBanner;
