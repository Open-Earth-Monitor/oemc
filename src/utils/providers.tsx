'use client';

import { useState, type FC, type PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Provider as JotaiProvider } from 'jotai';
import { TooltipProvider } from '@/components/ui/tooltip';

type ProvidersProps = FC<PropsWithChildren>;

const Providers: ProvidersProps = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );
  return (
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>{children}</JotaiProvider>
      </QueryClientProvider>
    </TooltipProvider>
  );
};

export default Providers;
