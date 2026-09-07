'use client';

import { useEffect, useMemo, useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import cn from '@/lib/classnames';

import type { Post as PostTypes } from '@/hooks/social-media';

import { Post, getPostLink, getPostTarget } from '@/containers/globe/live-updates/post';

import { Carousel, CarouselContent, CarouselItem, useCarousel } from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';

const CarouselButton = ({ direction }: { direction: 'prev' | 'next' }) => {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

  const isPrev = direction === 'prev';

  return (
    <button
      onClick={isPrev ? scrollPrev : scrollNext}
      disabled={isPrev ? !canScrollPrev : !canScrollNext}
      className="z-10 shrink-0 rounded-full bg-white-950 p-1.5 shadow-md backdrop-blur-sm disabled:opacity-50"
      aria-label={isPrev ? 'Previous Slide' : 'Next Slide'}
      title={isPrev ? 'Previous post' : 'Next post'}
    >
      {isPrev ? (
        <ChevronLeftIcon size={18} className="text-white-500" />
      ) : (
        <ChevronRightIcon size={18} className="text-white-500" />
      )}
    </button>
  );
};

const CarouselDots = ({
  api,
  total,
  activeIndex,
  visibleDots = 6,
}: {
  api: CarouselApi | null;
  total: number;
  activeIndex: number;
  visibleDots?: number;
}) => {
  // Each dot is an 8px disc inside a 24px button: 24px is the minimum target
  // size that passes WCAG 2.5.8, and the 8px discs alone failed the audit. The
  // buttons sit edge to edge, so the step between dots is the button size and
  // the scaled active disc (12px) still fits inside its own button.
  const TARGET_SIZE = 24; // h-6 w-6 => 24px
  const STEP = TARGET_SIZE;

  const maxStart = Math.max(0, total - visibleDots);

  const startIndex = useMemo(() => {
    if (total <= visibleDots) return 0;

    const centeredStart = activeIndex - Math.floor(visibleDots / 2);
    return Math.max(0, Math.min(centeredStart, maxStart));
  }, [activeIndex, total, visibleDots, maxStart]);

  const translateX = startIndex * STEP;
  // The strip is exactly as wide as the buttons it shows; anything wider
  // pushed the dots off-centre and clipped the last visible one.
  const shownDots = Math.min(total, visibleDots);
  const viewportWidth = shownDots * TARGET_SIZE;

  if (!total) return null;

  return (
    <div
      className="shrink-0 overflow-hidden"
      style={{ width: `${viewportWidth}px` }}
      data-testid="live-updates-dots"
    >
      <div
        className="flex items-center transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${translateX}px)` }}
      >
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeIndex === index ? 'true' : undefined}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-green"
          >
            <span
              aria-hidden="true"
              className={`block h-2 w-2 rounded-full transition-all ${
                activeIndex === index
                  ? 'scale-150 bg-gradient-to-br from-[#1EEDBF] to-[#75A1FF]'
                  : 'bg-white-500/40'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

/** What following a card opens, for assistive tech; see `PostCard`. */
const describePostLink = (post: PostTypes) => {
  const target = getPostTarget(post);
  if (target.card?.title) return `Opens “${target.card.title}”`;
  const date = new Date(post.created_at);
  return Number.isNaN(date.getTime())
    ? 'Opens the post on Fosstodon'
    : `Opens the post from ${date.toLocaleDateString('en-GB', { dateStyle: 'long' })}`;
};

/**
 * One slide. The card is a link to the page the post shares, or to the post
 * itself when it shares none, and opens in a new tab. Embla suppresses the
 * click that ends a mouse drag, so swiping through the feed never opens
 * anything. Falls back to a plain card only if the API sent no url at all.
 */
const PostCard = ({
  post,
  onSelect,
}: {
  post: PostTypes;
  onSelect?: (post: PostTypes, url: string) => void;
}) => {
  const url = getPostLink(post);
  const className =
    'h-full w-full overflow-hidden rounded-3xl border border-black-100 bg-black-500';

  if (!url) {
    return (
      <div className={className} data-testid="live-updates-post">
        <Post post={post} />
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onSelect?.(post, url)}
      className={cn(
        className,
        'block transition-colors duration-500 hover:bg-black-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-green'
      )}
      data-testid="live-updates-post"
    >
      <Post post={post} insideLink />
      {/* A card with a picture has only the author in its text, so several cards
          would read as identical links. Name what each one opens. */}
      <span className="sr-only">{describePostLink(post)}</span>
    </a>
  );
};

export const SocialMediaContent = ({
  data,
  setCount,
  count,
  fill = false,
  onSelect,
}: {
  data?: PostTypes[];
  setCount: React.Dispatch<React.SetStateAction<number>>;
  count: number;
  /**
   * Take the height the parent gives and no more — the globe panel, which is
   * bounded by the footer. Off in the mobile drawer, where the column simply
   * grows and the drawer scrolls.
   */
  fill?: boolean;
  /** Called when a card is followed, with the page it opens. */
  onSelect?: (post: PostTypes, url: string) => void;
}) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const dataLength = data?.length ?? 0;
  const activeIndex = count - 1;

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setCount(api.selectedScrollSnap() + 1);
    };

    update();
    api.on('select', update);
    api.on('reInit', update);

    return () => {
      api.off('select', update);
      api.off('reInit', update);
    };
  }, [api, setCount]);

  return (
    <div className={cn('flex min-h-0 flex-col', fill && 'overflow-hidden')}>
      {/* Column layout rather than a capped height: the arrows and dots then sit
          in flow under the slides instead of overlapping whatever follows. When
          `fill` is on, the slides are what gives way if the panel is short — a
          post is a teaser and can be cropped, a publication card cannot. */}
      <Carousel
        opts={{ align: 'center', loop: true, slidesToScroll: 1, active: true }}
        className={cn('relative flex flex-col gap-y-2', fill && 'min-h-0')}
        setApi={setApi}
      >
        <CarouselContent className={cn(fill && 'min-h-0')}>
          {data?.map((post) => (
            <CarouselItem
              key={post.id}
              className={cn(
                'flex items-start justify-center  lg:max-w-md xl:max-w-xs',
                fill && 'h-full items-stretch'
              )}
            >
              <PostCard post={post} onSelect={onSelect} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="relative z-10 m-auto flex w-full shrink-0 items-center justify-center gap-4">
          <CarouselButton direction="prev" />
          <CarouselDots api={api} total={dataLength} activeIndex={activeIndex} visibleDots={6} />
          <CarouselButton direction="next" />
        </div>
      </Carousel>
    </div>
  );
};

const SocialMediaDesktop = ({
  data,
  children,
  onSelect,
}: {
  data?: PostTypes[];
  /** Rendered under the carousel, in the same column (the publications list). */
  children?: React.ReactNode;
  /** Called when a card is followed, with the page it opens. */
  onSelect?: (post: PostTypes, url: string) => void;
}) => {
  const [count, setCount] = useState(1);

  const dataLength = data?.length ?? 0;

  // The panel never grows past the area its parent gives it — the globe, which
  // stops where the footer begins. Everything inside is sized against that box
  // rather than allowed to run past it and be cut off at the edge.
  return (
    <div className="pointer-events-auto flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl xl:w-[320px]">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col gap-y-4">
          <div className="flex shrink-0 items-end justify-between font-medium text-white-500">
            <p>
              Latest insights <br /> and innovations.
            </p>
            <span>
              {count} / {dataLength}
            </span>
          </div>

          <SocialMediaContent
            data={data}
            setCount={setCount}
            count={count}
            onSelect={onSelect}
            fill
          />

          {/* Publications read as their own block, not as a caption of the
              carousel, so they get a rule and clear space above. */}
          {!!children && (
            <div className="shrink-0 border-t border-white-900/10 pt-4">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaDesktop;
