'use client';

import { FC } from 'react';

import { FooterDesktop } from './desktop';
import { FooterMobile } from './mobile';
import { useMediaQuery } from 'react-responsive';
import { mobile } from '@/lib/media-queries';

export const Footer: FC = () => {
  const isMobile = useMediaQuery(mobile);
  return isMobile ? <FooterMobile /> : <FooterDesktop />;
};

export default Footer;
