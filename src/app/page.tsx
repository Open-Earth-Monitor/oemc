import type { NextPage, Metadata } from 'next';

import LandingDatasets from '@/components/datasets-grid';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import PreFooter from '@/components/pre-footer';

export const metadata: Metadata = {
  title: 'Hub - Open Earth Monitor Cyberinfrastructure',
  description: '...',
};

const Hub: NextPage = () => (
  <>
    <Hero />
    <LandingDatasets />
    <PreFooter />
    <Footer />
  </>
);

export default Hub;
