import type { NextPage, Metadata } from 'next';

import LandingDatasets from '@/components/datasets-grid';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Hero from '@/components/hero';
import SocialMediaFeed from '@/components/social-media';

export const metadata: Metadata = {
  title: 'Hub - Open Earth Monitor Cyberinfrastructure',
  description:
    'Open Earth Monitor Cyberinfrastructure is an ecosystem of actors creating and using data tools in support of the sustainable environmental policy.',
};

const Hub: NextPage = () => (
  <>
    <Header />
    <Hero />
    <SocialMediaFeed />
    <LandingDatasets />
    <Footer />
  </>
);

export default Hub;
