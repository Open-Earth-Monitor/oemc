'use client';

import { FC, useEffect, useRef } from 'react';

import { useMediaQuery } from 'react-responsive';

import { tablet } from '@/lib/media-queries';

import { FooterDesktop } from './desktop';
import { FooterMobile } from './mobile';

/**
 * The footer has two variants of very different heights (the mobile one stacks
 * and is fixed on top of the page), and overlays such as the globe's live feed
 * have to stay clear of it. Publishing the measured height as `--footer-height`
 * lets them reserve exactly the room it takes instead of hardcoding a guess.
 */
const useFooterHeightVariable = (variant: 'mobile' | 'desktop') => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The mobile footer is `fixed`, so the wrapper measures zero: the `<footer>`
    // itself is what has to be observed, in either variant.
    const element = ref.current?.querySelector('footer');
    if (!element) return;

    const root = document.documentElement;
    const observer = new ResizeObserver(([entry]) =>
      root.style.setProperty('--footer-height', `${entry.target.getBoundingClientRect().height}px`)
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      root.style.removeProperty('--footer-height');
    };
  }, [variant]);

  return ref;
};

export const Footer: FC = () => {
  const isTablet = useMediaQuery(tablet);
  const ref = useFooterHeightVariable(isTablet ? 'mobile' : 'desktop');

  return <div ref={ref}>{isTablet ? <FooterMobile /> : <FooterDesktop />}</div>;
};

export default Footer;
