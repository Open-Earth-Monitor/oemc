'use client';

import { useCallback } from 'react';

import { useMediaQuery } from 'react-responsive';
import { scroller } from 'react-scroll';

import Image from 'next/image';
import Link from 'next/link';

import { motion, useAnimation } from 'framer-motion';
import { HiOutlineArrowCircleRight } from 'react-icons/hi';

import { mobile, tablet } from '@/lib/media-queries';

import MainMenuDesktop from '@/components/main-menu/desktop';
import MainMenuMobile from '@/components/main-menu/mobile';

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

  // const isMobile = useMediaQuery(mobile);
  // const isTablet = useMediaQuery(tablet);

  return (
    <div className="relative h-[739px] w-full bg-[url('/images/landing/hero.webp')] bg-cover bg-top">
      <div className="h-[70px] w-full items-center border-b border-b-secondary-900 bg-brand-500 bg-opacity-20">
        <div className="m-auto flex h-full max-w-[1200px] items-center justify-between">
          <div className="mx-2 flex items-center space-x-4">
            <Link href="/">
              <Image
                alt="Open-earth-monitor"
                src="/images/OEM-logo.svg"
                width={147}
                height={40}
                className="block"
                priority
              />
            </Link>
            <div
              data-testid="alpha-site"
              className="rounded-sm border border-alert px-[6px] py-1 font-inter text-xs text-alert"
            >
              Alpha version
            </div>
          </div>
          <MainMenuDesktop />
          <MainMenuDesktop />
          {/* {!isMobile && <MainMenuDesktop />}
          {isMobile && <MainMenuMobile />} */}
        </div>
      </div>
      <div className="m-auto ">
        <h1 className="whitespace-wrap m-auto px-48 pb-16 pt-[295px] text-center font-satoshi text-[80px] font-black leading-[96px]">
          {' '}
          Discover and empower with monitoring solutions.
        </h1>
      </div>
      <motion.button
        initial="initial"
        whileHover="hover"
        onHoverStart={startBounce}
        onHoverEnd={stopBounce}
        className="flex w-full cursor-pointer items-center justify-center space-x-2 uppercase"
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
