export function parseBBox(value: string | number[], label: 'monitor' | 'geostory'): number[] {
  if (value === null || value === undefined) return null;
  if (
    Array.isArray(value) &&
    value.length === 4 &&
    value.every((v) => typeof v === 'number' && !isNaN(v))
  ) {
    return value;
  }

  if (typeof value === 'string') {
    const parts = value.split(',').map(Number);
    if (parts.length === 4 && parts.every((v) => !isNaN(v))) {
      return parts;
    }
  }
  // eslint-disable-next-line no-console
  console.warn(`Invalid ${label} bbox:`, value);
  return null;
}
