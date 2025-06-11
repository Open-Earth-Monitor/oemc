import Script from 'next/script';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const mostVisitedMonitors = [
  {
    tag: '#Agriculture',
    title: 'Tropical monitor.',
    color: '#FF9383',
  },
  {
    tag: '#Soil',
    title: 'EU-soil monitor.',
    color: '#F2C69C',
  },
  {
    tag: '#Biodiversity',
    title: 'EU-reforestation planner tool.',
    color: '#FBFBB1',
  },
  {
    tag: '#Water',
    title: 'EU-flood monitor.',
    color: '#BDDEFD',
  },
  {
    tag: '#Forest',
    title: 'EU-in-situ-data tool.',
    color: '#B5FEC5',
  },
];

const mostVisitedGeostories = [
  'Soil bare-fraction dynamics',
  'Air Quality during COVID-19 (Europe)',
  'Vegetation trait diversity',
  'Trait-based reforestation monitoring',
  'Climate change (Europe)',
];

const WebTrafficMobileContent = () => {
  return (
    <div className="flex h-[calc(100vh-60px)] w-full grow flex-col space-y-4 overflow-y-auto p-5">
      <h2 className="text-4xl font-bold">Live Usage Statistics</h2>
      <span className="pl-4">Switch between the two different tabs</span>
      <Tabs defaultValue="web-graphic" className="flex w-full flex-1 grow flex-col">
        <TabsList className="border-none">
          <TabsTrigger
            value="web-graphic"
            className="rounded-none border-0 py-5 hover:bg-transparent focus:ring-0 data-[state=active]:border data-[state=active]:border-x-[0.5px] data-[state=inactive]:border-y-0 data-[state=active]:border-b-2 data-[state=active]:border-t-2 data-[state=active]:border-brand-50 data-[state=active]:border-b-brand-500 data-[state=active]:border-t-secondary-600 data-[state=active]:bg-transparent"
          >
            <div className="whitespace-normal font-inter text-xs font-medium uppercase tracking-widest">
              Web Geographic Activity
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="list"
            className="rounded-none border-0 py-5 hover:bg-transparent focus:ring-0 data-[state=active]:border data-[state=active]:border-x-[0.5px] data-[state=inactive]:border-y-0 data-[state=active]:border-b-2 data-[state=active]:border-t-2 data-[state=active]:border-brand-50 data-[state=active]:border-b-brand-500 data-[state=active]:border-t-secondary-600 data-[state=active]:bg-transparent"
          >
            <div className="whitespace-normal font-inter text-xs font-medium uppercase tracking-widest">
              Monitors and Geostories
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Map Tab Content */}
        <TabsContent
          value="web-graphic"
          className="relative mt-0 box-content flex w-full flex-1 grow flex-col rounded-none"
        >
          <script
            type="text/javascript"
            id="clustrmaps"
            src="//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=a&t=tt&d=e9bF-yBRaYPXvvGpxTgq-74ob4nqMoaLjIgTO-UoDyQ&co=092539"
          />

          <Script
            id="clustrmaps"
            src="//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=a&t=tt&d=e9bF-yBRaYPXvvGpxTgq-74ob4nqMoaLjIgTO-UoDyQ&co=092539"
          />
        </TabsContent>

        <TabsContent
          value="list"
          className="relative -mt-[0.5px] grid h-full w-full flex-1 grow grid-cols-2 border border-brand-50"
        >
          <div className="h-full w-full grid-cols-2 space-y-4  p-6 text-secondary-500">
            <h5 className="text-xs font-medium uppercase tracking-widest text-alert">
              top 5 most visited monitors
            </h5>
            <ul className="space-y-5">
              {mostVisitedMonitors.map(({ title, tag, color }) => (
                <li key={title} className="flex h-full space-x-4">
                  <span style={{ backgroundColor: color }} className="flex w-1 flex-shrink-0" />

                  <div className="flex flex-col space-y-2.5">
                    <span className="text-xs">{tag}</span>
                    <p className="text-2xl font-bold">{title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full space-y-4 overflow-y-scroll p-6 text-secondary-500">
            <h5 className="text-xs font-medium uppercase tracking-widest text-alert">
              top 5 most visited geostories
            </h5>
            <ul className="space-y-5">
              {mostVisitedGeostories.map((geostory) => (
                <li key={geostory} className="text-2xl font-bold">
                  {geostory}
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebTrafficMobileContent;
