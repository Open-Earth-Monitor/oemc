import Script from 'next/script';

import Image from 'next/image';
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
    <DialogContent className="h-full w-full bg-secondary-500 text-brand-500">
      <DialogHeader className="space-y-5">
        <DialogTitle asChild>
          <header className="flex items-center justify-between">
            <h2 className="text-5xl font-bold">Disclaimer</h2>
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
      <div className="f-full grid w-full grid-cols-2 gap-2">
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
        <ul>
          <li>holi</li>
        </ul>
      </div>
    </DialogContent>
  </Dialog>
);

export default WebTraffic;
