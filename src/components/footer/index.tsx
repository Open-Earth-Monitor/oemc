'use client';

import { FC } from 'react';

import { useMediaQuery } from 'react-responsive';

import { tablet } from '@/lib/media-queries';

import { FooterDesktop } from './desktop';
import { FooterMobile } from './mobile';

export const Footer: FC = () => {
  const isTablet = useMediaQuery(tablet);

  return isTablet ? <FooterMobile /> : <FooterDesktop />;
};

export default Footer;
