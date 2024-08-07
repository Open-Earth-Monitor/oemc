'use client';

import { useCallback } from 'react';

import { scroller } from 'react-scroll';

import { motion, useAnimation } from 'framer-motion';
import { HiOutlineArrowCircleRight } from 'react-icons/hi';

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
        <h1 className="whitespace-wrap m-auto pb-16 text-center font-satoshi text-5xl font-black leading-tight lg:text-[80px] lg:leading-[96px]">
          Discover and empower with monitoring solutions.
        </h1>
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
