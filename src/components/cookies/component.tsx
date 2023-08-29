import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';

import type { CookiesProps } from './types';

export const Cookies: React.FC<CookiesProps> = ({ open, onAccept, onReject }: CookiesProps) => {
  return (
    <AnimatePresence>
      {open && (
        <div>
          <motion.div
            initial={{
              opacity: 0,
              y: '100%',
            }}
            animate={{
              opacity: 1,
              y: '0%',
              transition: {
                delay: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              y: '100%',
              transition: {
                delay: 0,
              },
            }}
            className="fixed bottom-0 left-0 z-50 w-full translate-y-full transform overflow-hidden bg-gray-100 p-6 outline-none"
          >
            <div className="flex flex-col space-y-5 lg:flex-row lg:items-center lg:justify-between lg:space-x-5 lg:space-y-0">
              <p className="text-base">
                This website uses cookies to ensure you get the best experience on our website. Read
                our{' '}
                <Link href="/privacy-policy" className="text-black font-semibold underline">
                  cookie policy
                </Link>{' '}
                to know more.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Cookies;
