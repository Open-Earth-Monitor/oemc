import { FC, PropsWithChildren, useEffect, useState } from 'react';

import { ChevronDownIcon } from 'lucide-react';

import cn from '@/lib/classnames';

import { useSyncLayersSettings } from '@/hooks/sync-query';

import BackToMonitorsAndGeostories from '@/containers/sidebar/back-monitors-geostories-button';

import Legend from '@/components/map/legend/component';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

/**
 * The open drawer reaches up to the page header and no further. The header on
 * phones (`sm:hidden` in the explore layout) is 66px tall — 10px padding above
 * and below the 46px menu pill — and the toolbar's own two buttons take 60px
 * under the drawer, so the drawer gets everything between: 100dvh − 126px. The
 * previous `80vh` was blind to the header and slid under it on short screens.
 * (Written out twice below: Tailwind only picks up literal class names.)
 */
const LABELS = {
  monitor: 'Monitor',
  geostory: 'Geostory',
} as const;

const MobileExploreToolbar: FC<PropsWithChildren<{ type: keyof typeof LABELS }>> = ({
  type,
  children,
}) => {
  const [showDetails, setShowDetails] = useState(true);
  const [showLegend, setShowLegend] = useState(false);

  // Same rule as the desktop map: there is a legend only while a layer is on
  // the map. Monitors and geostories without layers, and a layer the user
  // removed, leave nothing to show, so the tab goes with it.
  const [layers] = useSyncLayersSettings();
  const isLayerActive = !!layers?.[0]?.id;

  useEffect(() => {
    if (!isLayerActive) setShowLegend(false);
  }, [isLayerActive]);

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full text-sm md:hidden">
      {/* Drawer / Sheet */}
      <div
        className="z-50 max-h-[calc(100dvh-126px)] bg-black-500 text-white-500 transition-transform"
        style={{
          transform: showDetails || showLegend ? 'translateY(0)' : 'translateY(100%)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {showDetails && (
          <div className="relative min-h-[calc(100dvh-126px)] overflow-hidden p-4">
            <div className="absolute inset-0 z-10 flex flex-col overflow-hidden">
              <header className="flex shrink-0 px-6 pb-2 pt-6">
                <BackToMonitorsAndGeostories />
              </header>
              <ScrollArea className="min-h-0 flex-1">
                <div className="px-4 pb-4">{children}</div>
              </ScrollArea>
            </div>
          </div>
        )}

        {isLayerActive && (
          <div
            className={cn(
              'transition-all',
              showLegend
                ? 'pointer-events-auto relative z-10 scale-100 opacity-100'
                : 'pointer-events-none absolute inset-0 z-0 scale-95 opacity-0'
            )}
          >
            <Legend />
          </div>
        )}
      </div>

      <div className="flex h-[60px]">
        <Button
          className={cn({
            'z-60 relative flex w-full justify-between rounded-none border-none bg-black-500 px-6 py-2 text-sm text-white-500':
              true,
            'bg-accent-green text-black-500': showDetails,
          })}
          onClick={() => {
            if (showLegend) {
              setShowLegend(false);
            }

            setShowDetails(!showDetails);
          }}
        >
          <span>{LABELS[type]}</span>
          <ChevronDownIcon
            size={24}
            className={cn({
              'text-accent-green transition-all': true,
              'rotate-180 text-black-500': showDetails,
            })}
          />
        </Button>
        {isLayerActive && (
          <Button
            data-testid="mobile-legend-toggle"
            className={cn({
              'z-60 relative flex w-full justify-between rounded-none border-none bg-black-500 px-6 py-2  text-sm text-white-500':
                true,
              'bg-accent-green text-black-500': showLegend,
            })}
            onClick={() => {
              if (showDetails) {
                setShowDetails(false);
              }

              setShowLegend(!showLegend);
            }}
          >
            <span>Legend</span>
            <ChevronDownIcon
              size={24}
              className={cn({
                'text-accent-green transition-all': true,
                'rotate-180 text-black-500': showLegend,
              })}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default MobileExploreToolbar;
