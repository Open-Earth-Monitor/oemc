import cn from '@/lib/classnames';

import Logo from '@/containers/explore/logo';

import MainMenuDesktop from '@/components/main-menu/desktop';

const Header = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'pointer-events-auto z-[1000] m-auto flex w-full flex-1 items-center px-4 py-2.5 sm:py-5',
        className
      )}
    >
      <div className="flex h-full flex-1 items-center justify-between">
        <Logo />
        <MainMenuDesktop />
      </div>
    </div>
  );
};

export default Header;
