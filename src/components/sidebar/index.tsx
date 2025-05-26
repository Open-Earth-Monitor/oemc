import { useState } from 'react';

import { cn } from '@/lib/classnames';

import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar';
import { useMonitorsAndGeostories } from '@/hooks/datasets';
import SidebarSelect from './select';

import { Label } from '@/components/ui/label';

import { Checkbox, CheckboxIndicator } from '../ui/checkbox';
import SidebarCheckbox from './checkbox';

function AppSidebar() {
  const { data: results } = useMonitorsAndGeostories(null, {
    select: (data) => {
      return data.length;
    },
  });

  return (
    <Sidebar className="w-96 bg-black-400 px-9 py-12">
      <SidebarHeader>
        <div className="grid h-full w-full grid-cols-2 items-end justify-center gap-5">
          <h1 className="max-w-1/2 text-xl text-white-500">
            Explore our{' '}
            <span className="bg-[linear-gradient(131.67deg,_#1EEDBF_0%,_#75A1FF_100%)] bg-clip-text text-transparent">
              Monitors & Geostories
            </span>
          </h1>

          <span className="flex w-fit justify-end space-x-1 place-self-end rounded-full bg-white-500 bg-opacity-5 px-2 text-sm font-medium">
            <span>{results}</span>
            <span>{results === 1 ? 'result' : 'results'}</span>
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="py-6">
          <SidebarSelect />
        </div>
        <SidebarCheckbox />
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
