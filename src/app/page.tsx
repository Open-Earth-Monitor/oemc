import type { NextPage, Metadata } from 'next';

import LandingDatasets from '@/components/datasets-grid';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import SocialMedia from '@/components/social-media';

export const metadata: Metadata = {
  title: 'Hub - Open Earth Monitor Cyberinfrastructure',
  description:
    'Open Earth Monitor Cyberinfrastructure is an ecosystem of actors creating and using data tools in support of the sustainable environmental policy.',
};

const Hub: NextPage = () => (
  <>
    <Hero />
    <LandingDatasets />
    <SocialMedia />
    <Footer />
  </>
);

export default Hub;
