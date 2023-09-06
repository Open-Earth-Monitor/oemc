import { FC } from 'react';

import MonitorsList from '@/components/monitors-list';

export const Sidebar: FC = () => {
  return (
    <aside className="absolute bottom-16 left-5 top-5 z-50 w-[30vw] overflow-y-auto bg-brand-600 p-7.5">
      <MonitorsList />
    </aside>
  );
};

export default Sidebar;
