'use client';

import VideoComponent from './video';

const Hero = () => {
  return (
    <div className="relative top-[70px] h-full w-full">
      <div className="container relative mx-auto h-[calc(100vh_-_70px)] w-full pb-[60px] pt-[70px] lg:h-[739px]">
        <VideoComponent />
        <div
          className="absolute bottom-0 left-0 right-0 top-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(9, 19, 29, 0) 66.27%, #09131D 100%), linear-gradient(90deg, #09131D 0%, rgba(9, 19, 29, 0) 14.6%, rgba(9, 19, 29, 0) 85.45%, #09131D 100%)',
          }}
        />
        <div className="absolute m-auto pt-48 xl:pt-[274px]">
          <h1 className="whitespace-wrap font-satoshi m-auto pb-16 text-center text-5xl font-black leading-tight lg:text-6xl lg:leading-[96px] xl:text-[80px]">
            Discover and empower with monitoring solutions.
          </h1>
          <div className="m-auto w-fit bg-brand-500">
            <p className="m-auto flex w-fit items-baseline space-x-2.5 bg-[#FFFFE60D] p-2.5 text-center text-[10px] text-secondary-500 opacity-100">
              <span className="block h-2.5 w-2.5 shrink-0 bg-[#1EEDBF]" />
              <span>
                Sentinel-5P Tropospheric Nitrogen Dioxide Density at 2 km from 2018-05 to 2022-11
                Monthly Aggregation
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
