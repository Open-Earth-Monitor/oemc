import type { NextPage, Metadata } from 'next';

import ReactOpenLayers from './';

export const metadata: Metadata = {
  title: 'Hub - Open Earth Monitor Cyberinfrastructure',
  description:
    'Open Earth Monitor Cyberinfrastructure is an ecosystem of actors creating and using data tools in support of the sustainable environmental policy.',
};

const Hub: NextPage = () => <ReactOpenLayers />;

export default Hub;
