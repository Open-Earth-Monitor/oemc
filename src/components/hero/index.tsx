'use client';

import { useCallback } from 'react';

import { scroller } from 'react-scroll';

import { motion, useAnimation } from 'framer-motion';
import { HiOutlineArrowCircleRight } from 'react-icons/hi';
// import VideoComponent from './video';

const Hero = () => {
  const controls = useAnimation();
  const startBounce = useCallback(
    () =>
      controls.start({
        y: [-5, 5, -5, 5, -5, 5],
        transition: { duration: 2, ease: 'easeInOut', repeat: Infinity },
      }),
    [controls]
  );
  const stopBounce = useCallback(() => {
    controls.stop(); // Stop the animation when hovering stops
  }, [controls]);
  const handleScroll = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    scroller.scrollTo('datasetsGrid', {
      duration: 500,
      delay: 20,
      smooth: 'easeInOutQuint',
    });
  }, []);

  return (
    <div className="container relative mx-auto w-full bg-[url('/images/landing/hero.webp')] bg-cover bg-top pb-[60px] pt-[70px] lg:h-[739px]">
      <div className="m-auto pt-[80px] sm:pt-[274px] lg:pt-[295px]">
        <h1 className="whitespace-wrap font-satoshi m-auto pb-16 text-center text-5xl font-black leading-tight lg:text-6xl lg:leading-[96px] xl:text-[80px]">
          test4: Discover and empower with monitoring solutions.
        </h1>
        {/* <div className="relative top-[70px] h-full w-full">
      <div className="container relative mx-auto h-[calc(100vh_-_70px)] w-full pb-[60px] pt-[70px] lg:h-[739px] xl:pt-12">
        <VideoComponent />
        <div
          className="absolute bottom-0 left-0 right-0 top-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(9, 19, 29, 0) 66.27%, #09131D 100%), linear-gradient(90deg, #09131D 0%, rgba(9, 19, 29, 0) 14.6%, rgba(9, 19, 29, 0) 85.45%, #09131D 100%)',
          }}
        />
        <div className="container absolute left-0 right-0 m-auto w-full pt-52 sm:pt-48 xl:pt-[274px]">
          <h1 className="whitespace-wrap font-satoshi m-auto pb-16 text-center text-5xl font-black leading-tight lg:text-6xl lg:leading-[96px] xl:text-[80px]">
            Discover and empower with monitoring solutions.
          </h1>
          <div className="m-auto w-fit bg-brand-500">
            <p className="m-auto flex w-fit items-baseline space-x-2.5 bg-[#FFFFE60D] p-2.5 text-center text-[10px] text-secondary-500 opacity-100">
              <span className="block h-2.5 w-2.5 shrink-0 bg-[#1EEDBF]" />
              <span>
                Sentinel-5P Tropospheric Nitrogen Dioxide Density at 2 km from 2018-05 to 2022-11
                Monthly Aggregation
              </span>
            </p>
          </div>
        </div> */}
      </div>
      <motion.button
        initial="initial"
        whileHover="hover"
        onHoverStart={startBounce}
        onHoverEnd={stopBounce}
        className="hidden w-full cursor-pointer items-center justify-center space-x-2 uppercase sm:flex"
        onClick={handleScroll}
      >
        <span className="font-inter text-xs font-medium">scroll to explore</span>
        <motion.div
          initial={{ y: 0 }}
          whileHover={{ scale: 1.1 }}
          animate={controls}
          onHoverStart={startBounce}
          onHoverEnd={stopBounce}
          className="cursor-pointer"
        >
          <HiOutlineArrowCircleRight className="h-6 w-6 rotate-90" />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default Hero;
