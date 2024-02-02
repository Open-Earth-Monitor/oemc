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
        x: [-5, 5, -5, 5, -5, 5],
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
    <div className="relative bg-[url('/images/landing/hero.png')] bg-cover bg-right-bottom">
      <div className="m-auto max-w-[1200px]">
        <h1 className="whitespace-wrap max-w-[800px] pb-20 pt-32 font-satoshi text-8xl font-black md:pt-36">
          {' '}
          Discover and empower with monitoring solutions.
        </h1>
      </div>
      <motion.button
        initial="initial"
        whileHover="hover"
        onHoverStart={startBounce}
        onHoverEnd={stopBounce}
        className="absolute -right-6 bottom-1/4 flex -translate-y-1/2 rotate-90 cursor-pointer items-center space-x-2 uppercase"
        onClick={handleScroll}
      >
        <span className="font-inter text-xs font-medium">scroll to explore</span>
        <motion.div
          initial={{ x: 0 }}
          whileHover={{ scale: 1.1 }}
          animate={controls}
          onHoverStart={startBounce}
          onHoverEnd={stopBounce}
          className="cursor-pointer"
        >
          <HiOutlineArrowCircleRight className="h-6 w-6" />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default Hero;
