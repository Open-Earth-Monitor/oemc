'use client';

import { InView } from 'react-intersection-observer';

import { motion } from 'framer-motion';
import { orderBy } from 'lodash-es';

import { useSocialMedia } from '@/hooks/social-media';

import Loading from '@/components/loading';
import { Post } from '@/components/social-media/post';

const SocialMedia = () => {
  const { data, isLoading, isFetched } = useSocialMedia(null, {
    select: (data) => {
      const orderedData = orderBy(data, 'created_at', 'desc');
      const postsIds = orderedData.map((post) => post.id);
      const filteredData = orderedData.filter((post) => !postsIds.includes(post.reblog?.id));
      return filteredData;
    },
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delay: 1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  console.log(data);
  return (
    <section className="font-satoshi relative grid w-full grid-cols-12">
      <div className="container col-span-12 m-auto flex flex-col items-center justify-center space-y-[18px] sm:space-y-10">
        <h3 className="max-w-xs text-center  text-xl font-medium sm:max-w-sm sm:text-2xl md:max-w-xl lg:max-w-3xl">
          <span className="text-white-500">
            Open Earth Monitor connects people, data, and technology to drive global sustainability.
          </span>{' '}
          <span className="bg-[linear-gradient(131.67deg,_#1EEDBF_0%,_#75A1FF_100%)] bg-clip-text text-transparent">
            Follow us to stay updated on the latest insights and innovations.
          </span>
        </h3>
        {isLoading && (
          <div>
            <Loading />
          </div>
        )}
        {isFetched && (
          <InView triggerOnce>
            {({ ref }) => (
              <motion.div
                ref={ref}
                className=" gap-5 sm:grid-cols-2 xl:grid-cols-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {data?.map((post) => (
                  <motion.div
                    key={post.id}
                    variants={item}
                    className="flex h-full w-full max-w-full flex-col"
                  >
                    <Post post={post} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </InView>
        )}
      </div>
    </section>
  );
};

export default SocialMedia;
