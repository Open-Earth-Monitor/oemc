import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="h-full bg-gradient-to-b from-[#0a141e] to-[#0a1520] pt-32">
      <div className="h-full w-full bg-[url('/images/landing/prefooter.png')] bg-cover bg-top pt-10 text-center text-secondary-500">
        <div className="m-auto flex h-full w-full max-w-[1200px] flex-col items-center justify-start space-y-5">
          <h1 data-testid="404-error" className="text-[240px] font-black leading-[288px]">
            404
          </h1>
          <p className="font-inter text-4xl font-bold">Page not found.</p>
          <p>It looks like the link is broken or the page has been removed.</p>
          <Link
            href="/"
            className="items-center justify-center space-x-2  bg-secondary-500 px-6 py-2 text-xs font-bold text-brand-500 transition-colors hover:bg-secondary-500 hover:bg-secondary-500/20 hover:text-secondary-500"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
