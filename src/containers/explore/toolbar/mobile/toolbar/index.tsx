import { FC, PropsWithChildren, useState } from 'react';

import { ChevronDownIcon } from 'lucide-react';

import cn from '@/lib/classnames';

import BackToMonitorsAndGeostories from '@/containers/sidebar/back-monitors-geostories-button';

import Legend from '@/components/map/legend/component';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const MobileExploreToolbar: FC<PropsWithChildren> = ({ children }) => {
  const [showDetails, setShowDetails] = useState(true);
  const [showLegend, setShowLegend] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full text-sm md:hidden">
      {/* Drawer / Sheet */}
      <div
        className="
          z-50 max-h-[80vh]
           bg-black-500 text-white-500
          transition-transform
          "
        style={{
          transform: showDetails || showLegend ? 'translateY(0)' : 'translateY(100%)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {showDetails && (
          <div className={cn('relative  overflow-hidden p-4', showDetails && 'min-h-[80vh]')}>
            <div className="absolute inset-0 z-10 overflow-hidden pb-[60px]">
              <header className="sticky flex px-6 pb-2 pt-6">
                <BackToMonitorsAndGeostories />
              </header>
              <ScrollArea className="h-full">
                <div className="px-4">{children}</div>
              </ScrollArea>
            </div>
          </div>
        )}

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
          <span>Monitor</span>
          <ChevronDownIcon
            size={24}
            className={cn({
              'text-accent-green transition-all': true,
              'rotate-180 text-black-500': showDetails,
            })}
          />
        </Button>
        <Button
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
      </div>
    </div>
  );
};

export default MobileExploreToolbar;
