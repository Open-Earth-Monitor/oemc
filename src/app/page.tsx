import type { NextPage } from 'next';

import LandingDatasets from '@/components/datasets-grid';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import Prefooter from '@/components/project-details';

const Hub: NextPage = () => {
  return (
    <div className=" text-secondary-500">
      <Hero />
      <LandingDatasets />
      <Prefooter />
      <Footer />
    </div>
  );
};

export default Hub;
