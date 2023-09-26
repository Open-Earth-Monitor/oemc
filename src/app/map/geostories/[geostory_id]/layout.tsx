import { FC, ReactNode } from 'react';

const GeostoriesLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <aside className="md:[30vw] absolute bottom-3 left-3 top-3 z-40 w-[526px] space-y-6 overflow-y-auto bg-brand-500 p-7.5">
      {children}
    </aside>
  );
};

export default GeostoriesLayout;
