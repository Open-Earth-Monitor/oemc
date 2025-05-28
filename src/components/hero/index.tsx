import Link from 'next/link';

import { LuCircleArrowRight } from 'react-icons/lu';

import { Button } from 'components/ui/button';

import Video from '@/components/video';

const Hero = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Video src="/video/globewithbg.mp4" />

      {/* Main Content */}
      <div className="relative z-10 grid min-h-screen grid-cols-12 items-center px-4">
        <div className="col-span-12 flex flex-col items-center justify-center space-y-6 text-center sm:space-y-10">
          <h1 className="font-satoshi text-white text-xl sm:text-3xl md:text-6xl lg:text-8xl">
            Discover and empower with monitoring solutions.
          </h1>
          <Link href="/explore">
            <Button variant="gradient">
              <span>Explore data</span>
              <LuCircleArrowRight className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom caption */}
      <div className="text-white absolute bottom-6 right-6 z-10 flex items-center space-x-2 text-xs">
        <span className="h-[9px] w-[9px] rounded-full bg-gradient-to-r from-[#1EEDBF] to-[#75A1FF]" />
        <span>Global wind speed at 10 km</span>
      </div>
    </div>
  );
};

export default Hero;
