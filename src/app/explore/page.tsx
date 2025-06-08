import axios from 'axios';
import type { Metadata, NextPage } from 'next';

import type { Geostory } from '@/types/geostories';

import SidebarContent from '@/containers/sidebar-content';
import Sidebar from '@/components/sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

type Props = {
  params: { geostory_id: string };
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
// read route params
// const id = params.geostory_id;
// fetch data
// const geostoryData = await axios
//   .get<Geostory[]>(`${process.env.NEXT_PUBLIC_API_URL}/geostories?geostory_id=${id}`)
//   .then((response) => response.data);
// return {
//   title: `Map page`,
// };
// }

const MapSidebarPage: NextPage<{ params: { geostory_id: string } }> = ({
  params: { geostory_id },
}) => {
  console.log('page explore');
  return (
    <SidebarProvider>
      <Sidebar />
      <div className="w-full">
        <div className="absolute left-0 top-0 h-screen w-screen overflow-hidden">
          {/* Map + Trigger */}

          <SidebarTrigger />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MapSidebarPage;
