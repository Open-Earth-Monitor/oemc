/**
 * Scroll the sidebar viewport to the `histogram-anchor-${id}` card and
 * compensate for the sticky header that sits at the top of the viewport,
 * so the histogram lands fully visible — not hidden underneath it.
 */
export function scrollToHistogram(id: string) {
  if (!id) return;
  if (typeof document === 'undefined') return;

  const vp = document.getElementById('sidebar-scroll-viewport');
  const el = document.getElementById(`histogram-anchor-${id}`);
  if (!vp || !el) return;

  el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });

  const sticky = vp.querySelector('.sticky') as HTMLElement | null;
  const offset = (sticky?.offsetHeight ?? 0) + 8;

  requestAnimationFrame(() => {
    vp.scrollTo({ top: vp.scrollTop - offset, behavior: 'smooth' });
  });
}
