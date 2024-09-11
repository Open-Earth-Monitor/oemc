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
    color: '',
  },
  {
    tag: '#Soil',
    title: 'EU-soil monitor.',
    color: '',
  },
  {
    tag: '#Biodiversity',
    title: 'EU-reforestation planner tool.',
    color: '',
  },
  {
    tag: '',
    title: '',
    color: '',
  },
  {
    tag: '',
    title: '',
    color: '',
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
      <DialogTrigger asChild data-testid="disclaimer-footer">
        <div className="flex h-full items-center justify-center space-x-2">
          <span className="h-2 w-2 rounded-full" />
          <p className="text-xs font-medium uppercase tracking-widest underline">usage stats</p>
        </div>
      </DialogTrigger>

      <DialogContent className="flex h-full w-full border border-secondary-500/10 bg-brand-400 p-5 text-brand-500 sm:min-w-[95vw] md:p-8 lg:p-12">
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

        <Tabs defaultValue="web-graphic" className="flex h-full w-full flex-1 flex-col">
          <TabsList className="border-none">
            <TabsTrigger
              value="web"
              className="rounded-none border-0 py-5 hover:bg-transparent focus:ring-0 data-[state=active]:border data-[state=active]:border-x-[0.5px] data-[state=active]:border-b-0 data-[state=active]:border-t-2 data-[state=active]:border-brand-50 data-[state=active]:border-t-secondary-600 data-[state=active]:bg-transparent"
            >
              <div className="text-xs font-medium uppercase tracking-widest">
                Web Geographic Activity
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className="rounded-none border-0 py-5 hover:bg-transparent focus:ring-0 data-[state=active]:border data-[state=active]:border-x-[0.5px] data-[state=active]:border-b-0 data-[state=active]:border-t-2 data-[state=active]:border-brand-50 data-[state=active]:border-t-secondary-600 data-[state=active]:bg-transparent"
            >
              <div className="text-xs font-medium uppercase tracking-widest">
                Monitors and Geostories
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Map Tab Content */}
          <TabsContent value="web-graphic" className="relative flex h-full w-full flex-1">
            <iframe
              style={{
                background: 'transparent',
                position: 'relative',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                height: '100%',
                width: '100%',
              }}
              scrolling="no"
              allowTransparency
              src="//rf.revolvermaps.com/w/7/a/a2.php?i=5ys2ccrnfty&m=0c&c=2becbf&cr1=2becbf&sx=0&cw=0b1825&cb=28333d"
            />
          </TabsContent>

          <TabsContent value="list" className="relative flex h-full w-full flex-1">
            <div className="flex h-full w-full">Other Content</div>
            <ul>
              {mostVisitedMonitors.map((monitor) => (
                <li>Item 1</li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
        <div className="relative h-full w-full"></div>
      </DialogContent>
    </Dialog>
  );
};

export default WebTraffic;
