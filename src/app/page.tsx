'use client';

import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import type { Metadata, NextPage } from 'next';
import { HiOutlineArrowCircleRight } from 'react-icons/hi';

import Footer from '@/components/footer';
import Hero from '@/components/hero';
import LandingDatasets from '@/components/landing-datasets';
import Prefooter from '@/components/project-details';

// export const metadata: Metadata = {
//   title: 'Hub - Open Earth Monitor Cyberinfrastructure',
//   description: '...',
// };

const Hub: NextPage = () => {
  const controls = useAnimation();
  const wrapperStyles = 'py-36';
  const startBounce = () =>
    controls.start({
      x: [-5, 5, -5, 5, -5, 5], // Define a sequence of y-values to create a bounce effect
      transition: { duration: 2, ease: 'easeInOut', repeat: Infinity }, // Adjust the duration and easing as needed
    });
  const stopBounce = () => {
    controls.stop(); // Stop the animation when hovering stops
  };

  return (
    <div className=" text-secondary-500">
      <div className="relative">
        <Hero className={wrapperStyles} />
        <div className="absolute -right-6 bottom-1/4 flex -translate-y-1/2 rotate-90 items-center space-x-2 uppercase">
          <span className="font-inter text-xs font-medium">scroll to explore</span>
          <AnimatePresence>
            <motion.a
              href="#explore-section"
              initial={{ x: 0 }}
              whileHover={{ scale: 1.1 }}
              animate={controls}
              onHoverStart={() => void startBounce()}
              onHoverEnd={stopBounce}
              className="cursor-pointer"
            >
              <HiOutlineArrowCircleRight className="h-6 w-6 text-secondary-500" />
            </motion.a>
          </AnimatePresence>
        </div>
      </div>

      <LandingDatasets />

      <Prefooter />
      <Footer />
    </div>
  );
};

export default Hub;
