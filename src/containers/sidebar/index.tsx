import { FC } from 'react';

import LayersList from '@/components/layers-list';

export const Sidebar: FC = () => {
  return (
    <aside className="absolute bottom-16 left-5 top-5 z-50 w-[30%] min-w-fit overflow-y-auto bg-brand-600 p-7.5">
      <LayersList />
    </aside>
  );
};

export default Sidebar;
