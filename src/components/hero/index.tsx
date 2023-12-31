'use client';

import { motion, useAnimation } from 'framer-motion';
import { HiOutlineArrowCircleRight } from 'react-icons/hi';

const Hero = () => {
  const controls = useAnimation();
  const startBounce = () =>
    controls.start({
      x: [-5, 5, -5, 5, -5, 5],
      transition: { duration: 2, ease: 'easeInOut', repeat: Infinity },
    });
  const stopBounce = () => {
    controls.stop(); // Stop the animation when hovering stops
  };
  return (
    <div className="relative bg-[url('/images/landing/hero.png')] bg-cover bg-right-bottom xl:pt-36">
      <div className="m-auto max-w-[1200px]">
        <h1 className="whitespace-wrap max-w-[800px] pb-20 pt-32 font-satoshi text-8xl font-black md:pt-36">
          {' '}
          Discover and empower with monitoring solutions.
        </h1>
      </div>
      <motion.div
        initial="initial"
        whileHover="hover"
        onHoverStart={() => startBounce()}
        onHoverEnd={stopBounce}
        className="absolute -right-6 bottom-1/4 flex -translate-y-1/2 rotate-90 cursor-pointer items-center space-x-2 uppercase"
      >
        <span className="font-inter text-xs font-medium">scroll to explore</span>
        <motion.a
          href="#explore-section"
          initial={{ x: 0 }}
          whileHover={{ scale: 1.1 }}
          animate={controls}
          onHoverStart={() => startBounce()}
          onHoverEnd={stopBounce}
          className="cursor-pointer"
        >
          <HiOutlineArrowCircleRight className="h-6 w-6" />
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Hero;
