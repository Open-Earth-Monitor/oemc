import { LuCircleArrowRight } from 'react-icons/lu';
import Link from 'next/link';
import { Button } from 'components/ui/button';

const Hero = () => {
  return (
    <div className="relative m-auto grid min-h-screen w-full grid-cols-12 items-center bg-[url('/images/landing/hero.webp')] bg-cover bg-center">
      <div className="container col-span-12 m-auto flex flex-col items-center justify-center space-y-[18px] sm:space-y-10">
        <h1 className="font-satoshi text-center text-xl sm:text-3xl md:text-6xl lg:text-8xl">
          Discover and empower with monitoring solutions.
        </h1>
        <div className="flex items-center justify-center">
          <Link href="/map">
            <Button variant="gradient">
              <span>Explore data</span>
              <LuCircleArrowRight className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-10 right-10 flex items-center space-x-2">
        <span className="h-[9px] w-[9px] bg-gradient-to-r from-[#1EEDBF] to-[#75A1FF]" />
        <span className="text-xs font-medium">Global wind speed at 10 km</span>
      </div>
    </div>
  );
};

export default Hero;
