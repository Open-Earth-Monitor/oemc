import { useEffect, useRef, useState } from 'react';

import { useAtomValue } from 'jotai';

import { areMapTilesLoadingAtom } from '@/app/store';

export const TIMELINE_STEP_DURATION = 2500;

/**
 * Drives timeline playback on a fixed cadence that never runs ahead of the map: a step is
 * held back while the WMS source still has tiles in flight, and fires as soon as it goes
 * idle. The slider, the date label and the rendered tiles therefore stay on the same date
 * instead of the map lagging behind the clock, and no date is skipped.
 *
 * Effective cadence is `max(TIMELINE_STEP_DURATION, tile load time)`.
 */
export function usePacedTimelineStep(isPlaying: boolean, step: () => void) {
  const areMapTilesLoading = useAtomValue(areMapTilesLoadingAtom);

  const stepRef = useRef(step);
  stepRef.current = step;

  const lastStepAtRef = useRef(0);
  // Re-runs the scheduling effect after each step so the next one gets queued
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    if (isPlaying) lastStepAtRef.current = Date.now();
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying || areMapTilesLoading) return;

    // Time already spent loading counts towards the step, so a slow date does not also
    // pay the full interval on top of its load time
    const elapsed = Date.now() - lastStepAtRef.current;
    const timeout = setTimeout(() => {
      lastStepAtRef.current = Date.now();
      stepRef.current();
      setStepCount((count) => count + 1);
    }, Math.max(0, TIMELINE_STEP_DURATION - elapsed));

    return () => clearTimeout(timeout);
  }, [isPlaying, areMapTilesLoading, stepCount]);
}
