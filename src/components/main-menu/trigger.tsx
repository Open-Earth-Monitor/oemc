import { LuMenu, LuX } from 'react-icons/lu';

const MainMenuTrigger = ({ open }: { open: boolean }) => (
  <>
    <span className="font-medium text-white-500">Menu</span>
    <span className="relative flex h-6 w-6 items-center justify-center">
      <LuMenu
        className={`absolute h-6 w-6 text-accent-green transition-all duration-200 ${
          open ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
      />
      <LuX
        className={`absolute h-6 w-6 text-accent-green transition-all duration-200 ${
          open ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0'
        }`}
      />
    </span>
  </>
);

export default MainMenuTrigger;
