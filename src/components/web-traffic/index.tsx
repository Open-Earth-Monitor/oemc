import Script from 'next/script';

import { motion } from 'framer-motion';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';

const WebTraffic = () => (
  <Dialog>
    <DialogTrigger asChild data-testid="disclaimer-footer">
      <motion.div initial="initial" whileHover="hover" className="w-fit">
        <span>Disclaimer</span>

        <motion.div
          className="h-0.5 w-0 bg-secondary-500"
          variants={{
            initial: { width: 0 },
            hover: { width: '100%' },
          }}
        />
      </motion.div>
    </DialogTrigger>
    <DialogContent className="w-[665px] bg-secondary-500 text-brand-500">
      <DialogHeader className="space-y-5">
        <DialogTitle asChild>
          <header className="flex items-center justify-between">
            <h2 className="text-5xl font-bold">Disclaimer</h2>
          </header>
        </DialogTitle>
        <DialogDescription asChild>
          <div className="space-y-3" data-testid="disclaimer-content">
            <Dialog>
              <DialogTrigger asChild data-testid="disclaimer-footer">
                <motion.div initial="initial" whileHover="hover" className="w-fit">
                  <span>Disclaimer</span>

                  <motion.div
                    className="h-0.5 w-0 bg-secondary-500"
                    variants={{
                      initial: { width: 0 },
                      hover: { width: '100%' },
                    }}
                  />
                </motion.div>
              </DialogTrigger>
              <DialogContent className="w-[665px] bg-secondary-500 text-brand-500">
                <DialogHeader className="space-y-5">
                  <DialogTitle asChild>
                    <header className="flex items-center justify-between">
                      <h2 className="text-5xl font-bold">Disclaimer</h2>
                    </header>
                  </DialogTitle>
                  <DialogDescription asChild>
                    <div className="space-y-3" data-testid="disclaimer-content">
                      {/* <iframe className="h-screen w-screen"> */}
                      <div className="relative h-full flex-1">
                        <Script
                          src="//rf.revolvermaps.com/0/0/8.js?i=55ky0c1lddb&amp;m=0&amp;c=ff0000&amp;cr1=ffffff&amp;f=arial&amp;l=33"
                          strategy="lazyOnload" // This attribute ensures the script loads without blocking page load
                          async
                        />
                      </div>
                      {/* </iframe> */}
                      <DialogClose className="right-10 flex items-center border-none text-xs font-medium uppercase tracking-[0.96px]">
                        Close
                      </DialogClose>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <DialogClose className="right-10 flex items-center border-none text-xs font-medium uppercase tracking-[0.96px]">
              Close
            </DialogClose>
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

export default WebTraffic;
