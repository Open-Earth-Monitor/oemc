import type { NextPage, Metadata } from 'next';

import LandingDatasets from '@/containers/hub/datasets-grid';

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
    <Header className="content-box absolute left-0 right-0 z-50 m-auto w-full" />
    <Hero />
    <SocialMediaFeed />
    <LandingDatasets />
  </>
);

export default Hub;
