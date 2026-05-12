/**
 * Scroll the sidebar viewport so the dataset card for `id` lands
 * directly under the sticky header. Computes the target offset
 * in a single `scrollTo` call to avoid racing with the smooth
 * animation of `scrollIntoView` + a post-scroll adjustment.
 */
export function scrollToHistogram(id: string) {
  if (!id) return;
  if (typeof document === 'undefined') return;

  const vp = document.getElementById('sidebar-scroll-viewport');
  const el = document.getElementById(`histogram-anchor-${id}`);
  if (!vp || !el) return;

  const sticky = vp.querySelector('.sticky') as HTMLElement | null;
  const offset = (sticky?.offsetHeight ?? 0) + 8;

  const vpRect = vp.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  const target = vp.scrollTop + (elRect.top - vpRect.top) - offset;

  vp.scrollTo({ top: Math.max(target, 0), behavior: 'smooth' });
}
