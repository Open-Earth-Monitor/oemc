'use client';

import { FC } from 'react';

import { useMediaQuery } from 'react-responsive';

import { mobile } from '@/lib/media-queries';

import { FooterDesktop } from './desktop';
import { FooterMobile } from './mobile';

export const Footer: FC = () => {
  const isMobile = useMediaQuery(mobile);
  return isMobile ? <FooterMobile /> : <FooterDesktop />;
};

export default Footer;
