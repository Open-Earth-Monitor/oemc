import * as Cesium from 'cesium';

const DURATION_MS = 1500;
const MAX_SCALE = 3.0;
const INITIAL_OPACITY = 0.6;

/**
 * Derive a deterministic phase offset (0-1) from a geostory ID string.
 * This staggers pulse animations across pins so they don't all pulse in unison.
 */
export function phaseOffsetFromId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  return Math.abs(hash % 1000) / 1000;
}

/**
 * Compute the current pulse scale for a given timestamp and phase offset.
 * Returns a value in [1, MAX_SCALE] that loops continuously.
 */
export function pulseScale(timeMs: number, phaseOffset: number): number {
  const t = (((timeMs / DURATION_MS + phaseOffset) % 1.0) + 1.0) % 1.0;
  return 1.0 + t * (MAX_SCALE - 1.0);
}

/**
 * Compute a Cesium.Color with the pulse opacity for a given timestamp and phase.
 * The base color's RGB is preserved; alpha fades from INITIAL_OPACITY to 0.
 */
export function pulseColor(
  baseColor: Cesium.Color,
  timeMs: number,
  phaseOffset: number
): Cesium.Color {
  const t = (((timeMs / DURATION_MS + phaseOffset) % 1.0) + 1.0) % 1.0;
  const alpha = INITIAL_OPACITY * (1.0 - t);
  return new Cesium.Color(baseColor.red, baseColor.green, baseColor.blue, alpha);
}

/**
 * Parse a hex/CSS color string into a Cesium.Color, with caching.
 */
const colorCache = new Map<string, Cesium.Color>();

export function cesiumColorFromCss(css: string): Cesium.Color {
  const cached = colorCache.get(css);
  if (cached) return cached;
  const color = Cesium.Color.fromCssColorString(css);
  colorCache.set(css, color);
  return color;
}
