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
      return filteredData.slice(0, 4);
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
  return (
    <section className="m-auto w-full max-w-[1200px] space-y-10 px-5 font-satoshi md:px-0 md:py-40">
      <h3 className="text-4xl font-bold">Follow our latest news.</h3>
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
              className="xs:grid-cols-1 relative m-auto grid gap-5 lg:grid-cols-2 xl:grid-cols-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {data?.map((post) => (
                <motion.div key={post.id} variants={item} className="h-full">
                  <Post post={post} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </InView>
      )}
    </section>
  );
};

export default SocialMedia;
