import Image from 'next/image';
import { motion } from 'framer-motion';

import { cn } from '@/lib/classnames';

import { CONTROL_BUTTON_STYLES } from '@/components/map/controls/constants';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';

const CompareRegionsStatistics = ({ isMobile }: { isMobile?: boolean }) => {
  return (
    <Dialog>
      <DialogTrigger asChild data-testid="compare-statistics">
        <motion.div
          initial="initial"
          whileHover="hover"
          className={cn({
            'bg-brand-500': true,
            'p-4': isMobile,
            [CONTROL_BUTTON_STYLES.mobile]: isMobile,
            [CONTROL_BUTTON_STYLES.default]: !isMobile,
          })}
        >
          <Image
            src={`/images/svgs/geometries.svg`}
            width={isMobile ? 48 : 20}
            height={isMobile ? 48 : 20}
            alt="geometries-layer"
          />
        </motion.div>
      </DialogTrigger>
      <DialogContent className="left-3 right-3 h-full w-full translate-x-0 transform-none border border-secondary-500/10 bg-brand-400 text-brand-500 sm:min-w-[95vw]">
        <DialogHeader className="space-y-5">
          <DialogTitle asChild>
            <header className="divide-y-secondary-500/10 flex items-center space-x-5 divide-x text-secondary-500">
              <h2 className="text-4xl font-bold">Live Usage Statistics</h2>
              <span className="pl-4">Switch between the two different tabs</span>
            </header>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-3" data-testid="disclaimer-content">
              <DialogClose className="right-10 flex items-center border-none text-xs font-medium uppercase tracking-[0.96px]">
                Close
              </DialogClose>
            </div>
          </DialogDescription>
        </DialogHeader>
        {/* <iframe
        className="h-full w-full flex-1"
        src="//rf.revolvermaps.com/w/8/a/a2.php?i=55ky0c1lddb&amp;m=0&amp;c=ff0000&amp;cr1=ffffff&amp;f=arial&amp;l=33"
        style={{
          background: 'transparent !important',
          position: 'absolute',
          left: 0,
          top: 0,
        }}
        width="100%"
        height="100%"
      /> */}
        <div className="f-full w-full">
          <a href="https://www.revolvermaps.com/livestats/5n2of9g4jjg/">
            <Image
              src="//rf.revolvermaps.com/h/m/a/0/ff0000/128/0/5n2of9g4jjg.png"
              // fill
              alt="web traffic map"
              // style={{ border: 0 }}
              // objectFit="content"
              // set the dimension (affected by layout)
              width={400}
              height={400 / (16 / 9)}
              priority={true}
              layout="fixed" // you can use "responsive", "fill" or the default "intrinsic"
              // onLoadingComplete={({ naturalWidth, naturalHeight }) =>
              //   setRatio(naturalWidth / naturalHeight)
              // }
            />
          </a>
          <ul></ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompareRegionsStatistics;
