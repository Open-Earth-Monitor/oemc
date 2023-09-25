'use client';
import { FC, useState, ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default Providers;
