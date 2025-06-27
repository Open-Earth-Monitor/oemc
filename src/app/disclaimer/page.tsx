import type { NextPage } from 'next';

import Header from '@/components/header';

const DisclaimerPage: NextPage = () => {
  return (
    <div className="container m-auto h-screen font-satoshi font-medium">
      <Header className="z-50 mx-0 px-0" />
      <div className="flex flex-col space-y-8 pt-56">
        <h1 className="bg-[linear-gradient(131.67deg,_#1EEDBF_0%,_#75A1FF_100%)] bg-clip-text text-7xl text-transparent">
          Disclaimer
        </h1>
      </div>
      <div className="space-y-6 py-12">
        <p data-testid="disclaimer-content-1">
          Funded by the European Union. Views and opinions expressed are however those of the
          author(s) only and do not necessarily reflect those of the European Union or European
          Commission.
        </p>
        <p data-testid="disclaimer-content-2">
          Neither the European Union nor the granting authority can be held responsible for them.
          The data is provided “as is”. Open-Earth-Monitor Cyberinfrastructure (OEMC) project
          consortium and its suppliers and licensors hereby disclaim all warranties of any kind,
          express or implied, including, without limitation, the warranties of merchantability,
          fitness for a particular purpose and non-infringement.
        </p>
        <p data-testid="disclaimer-content-3">
          Neither OEMC project Consortium nor its suppliers and licensors, makes any warranty that
          the Website will be error free or that access thereto will be continuous or uninterrupted.
          You understand that you download from, or otherwise obtain content or services through,
          the Website at your own discretion and risk.
        </p>
      </div>
    </div>
  );
};

export default DisclaimerPage;
