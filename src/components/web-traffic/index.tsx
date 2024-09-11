import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
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

const WebTraffic = () => {
  return (
    <Dialog>
      <DialogTrigger asChild data-testid="web-traffic-map">
        <div className="flex h-full items-center justify-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-red-600" />
          <p className="text-xs font-medium uppercase tracking-widest underline">usage stats</p>
        </div>
      </DialogTrigger>

      <DialogContent className="flex h-full w-full grow border border-secondary-500/10 bg-brand-400 p-5 text-brand-500 sm:min-w-[95vw] md:p-8 lg:p-12">
        <DialogHeader className="space-y-5">
          <DialogTitle asChild>
            <header className="divide-y-secondary-500/10 flex items-center space-x-5 divide-x text-secondary-500">
              <h2 className="text-4xl font-bold">Live Usage Statistics</h2>
              <span className="pl-4">Switch between the two different tabs</span>
            </header>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-3" data-testid="disclaimer-content">
              <DialogClose className="right-10 flex items-center border-none text-xs font-medium uppercase tracking-[0.96px]">
                Close
              </DialogClose>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex h-full min-h-[600px] w-full grow">
          <Tabs defaultValue="web-graphic" className="flex h-full w-full flex-1 grow flex-col">
            <TabsList className="border-none">
              <TabsTrigger
                value="web-graphic"
                className="rounded-none border-0 py-5 hover:bg-transparent focus:ring-0 data-[state=active]:border data-[state=active]:border-x-[0.5px] data-[state=active]:border-b-2 data-[state=active]:border-t-2 data-[state=active]:border-brand-50 data-[state=active]:border-b-brand-500 data-[state=active]:border-t-secondary-600 data-[state=active]:bg-transparent"
              >
                <div className="text-xs font-medium uppercase tracking-widest">
                  Web Geographic Activity
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="rounded-none border-0 py-5 hover:bg-transparent focus:ring-0 data-[state=active]:border data-[state=active]:border-x-[0.5px] data-[state=active]:border-b-2 data-[state=active]:border-t-2 data-[state=active]:border-brand-50 data-[state=active]:border-b-brand-500 data-[state=active]:border-t-secondary-600 data-[state=active]:bg-transparent"
              >
                <div className="text-xs font-medium uppercase tracking-widest">
                  Monitors and Geostories
                </div>
              </TabsTrigger>
            </TabsList>

            {/* Map Tab Content */}
            <TabsContent
              value="web-graphic"
              className="relative -mt-[0.5px] h-full min-h-[350px] w-full flex-1 grow border border-brand-50"
            >
              <iframe
                className="absolute bottom-0 left-0 right-0 top-0"
                style={{
                  border: 'none',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: '100%',
                  height: '100%',
                }}
                allowTransparency
                src="//rf.revolvermaps.com/w/7/a/a2.php?i=5ys2ccrnfty&m=0c&c=2becbf&cr1=2becbf&sx=0&cw=0b1825&cb=28333d"
              />
            </TabsContent>

            <TabsContent
              value="list"
              className="relative -mt-[0.5px] grid h-full w-fit flex-1 grid-cols-2 border border-brand-50"
            >
              <div className="h-full w-full grid-cols-2 space-y-4  p-6 text-secondary-500">
                <h5 className="text-xs uppercase tracking-widest text-alert">
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
              <div className="h-full w-full grid-cols-2 space-y-4 p-6 text-secondary-500">
                <h5 className="text-xs uppercase tracking-widest text-alert">
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
      </DialogContent>
    </Dialog>
  );
};

export default WebTraffic;
