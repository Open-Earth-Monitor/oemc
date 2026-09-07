/**
 * Id of the element the Cesium credits portal into when it exists. The mobile
 * landing layout renders it under the globe canvas, right above the footer;
 * without it the credits fall back to the bottom-right corner of the canvas.
 *
 * Kept in its own module so layout code can reference the id without pulling
 * resium/cesium into its bundle.
 */
export const GLOBE_ATTRIBUTION_SLOT_ID = 'globe-attribution-slot';
