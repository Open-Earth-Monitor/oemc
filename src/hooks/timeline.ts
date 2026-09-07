import { useEffect, useId, useRef, useState } from 'react';

import { useAtom, useAtomValue } from 'jotai';

import { areMapTilesLoadingAtom, timelinePlaybackOwnerAtom } from '@/app/store';

export const TIMELINE_STEP_DURATION = 2500;

/**
 * Drives timeline playback in step with the map. A step is held back while the WMS source
 * still has tiles in flight, and the interval only starts counting once the new date's tiles
 * are on screen, so every date is visible for the full `TIMELINE_STEP_DURATION` with the
 * slider, the date label and the rendered tiles on the same date. No date is skipped.
 *
 * Effective cadence is `tile load time + TIMELINE_STEP_DURATION`; with cached tiles that is
 * a few hundred milliseconds over the interval.
 *
 * Only one mounted Timeline drives playback. The legend is rendered once per breakpoint
 * with one copy hidden by CSS, so two Timelines share the playback state; the first to
 * claim `timelinePlaybackOwnerAtom` steps, the other stays passive and takes over if the
 * owner unmounts.
 */
export function usePacedTimelineStep(isPlaying: boolean, step: () => void) {
  const areMapTilesLoading = useAtomValue(areMapTilesLoadingAtom);

  const instanceId = useId();
  const [owner, setOwner] = useAtom(timelinePlaybackOwnerAtom);
  const isOwner = owner === instanceId;

  useEffect(() => {
    if (owner === undefined) setOwner(instanceId);
  }, [owner, instanceId, setOwner]);

  useEffect(() => {
    return () => setOwner((current) => (current === instanceId ? undefined : current));
  }, [instanceId, setOwner]);

  const stepRef = useRef(step);
  stepRef.current = step;

  // When the current dwell started: the moment the map went idle after the last step, or
  // the step itself if no tile load followed it.
  const dwellStartRef = useRef(0);
  const wasLoadingRef = useRef(false);
  // Re-runs the scheduling effect after each step so the next one gets queued
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    if (isPlaying) dwellStartRef.current = Date.now();
  }, [isPlaying]);

  useEffect(() => {
    if (areMapTilesLoading) {
      wasLoadingRef.current = true;
      return;
    }
    if (wasLoadingRef.current) {
      // The new date's tiles have just landed: this is when the user starts seeing it
      wasLoadingRef.current = false;
      dwellStartRef.current = Date.now();
    }

    if (!isPlaying || !isOwner) return;

    const elapsed = Date.now() - dwellStartRef.current;
    const timeout = setTimeout(() => {
      // Fallback dwell start, for a step that no tile load follows
      dwellStartRef.current = Date.now();
      stepRef.current();
      setStepCount((count) => count + 1);
    }, Math.max(0, TIMELINE_STEP_DURATION - elapsed));

    return () => clearTimeout(timeout);
  }, [isPlaying, isOwner, areMapTilesLoading, stepCount]);
}
