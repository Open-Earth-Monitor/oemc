import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

import cn from '@/lib/classnames';

import WebTrafficContent from './content';
import WebTrafficMobileContent from './mobile-content';

const WebTraffic = ({
  tablet = false,
  isMobile = false,
}: {
  tablet?: boolean;
  isMobile?: boolean;
}) => {
  return (
    <Dialog>
      <DialogTrigger data-testid="web-traffic-map" className="h-full cursor-pointer">
        <div
          className={cn({
            'flex h-full items-center justify-center space-x-2 whitespace-nowrap': true,
            'px-8': tablet,
          })}
        >
          <span className="h-2 w-2 rounded-full bg-red-600" />
          <p className="text-xs font-medium uppercase tracking-widest underline">
            {tablet ? 'stats' : 'usage stats'}
          </p>
        </div>
      </DialogTrigger>

      <DialogContent
        overlay={!isMobile}
        scrollArea={false}
        className={cn({
          '!flex h-full w-full flex-col border border-secondary-500/10 p-5 text-brand-500 sm:max-w-[95vw] md:max-w-[85vw] md:p-8 lg:p-12 xl:max-w-[65vw]':
            true,
          'absolute bottom-0 left-0 right-0 top-[60px] translate-x-0 translate-y-0': isMobile,
        })}
      >
        <DialogHeader className="pb-5">
          <DialogTitle asChild>
            <div className="flex items-center justify-between">
              <header className="divide-y-secondary-500/10 flex items-center space-x-5 divide-x text-secondary-500">
                <h2 className="text-4xl font-bold">Live Usage Statistics</h2>
                <span className="pl-4">Switch between the two different tabs</span>
              </header>
              <div className="space-y-3" data-testid="disclaimer-content">
                <DialogClose className="relative left-auto right-0 top-0 flex items-center border-none text-xs font-medium uppercase tracking-[0.96px] text-secondary-500 focus:text-secondary-500">
                  Close
                </DialogClose>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <WebTrafficContent />
        {isMobile && <WebTrafficMobileContent />}
      </DialogContent>
    </Dialog>
  );
};

export default WebTraffic;
