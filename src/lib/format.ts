export const formatDate = (date: string, time: boolean) => {
  const d = new Date(date);

  const dateOptions: unknown = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } satisfies Intl.DateTimeFormatOptions;

  const formattedDate = d.toLocaleDateString('en-US', dateOptions);

  return time ? `${formattedDate} ${d.toLocaleTimeString('en-US')}` : formattedDate;
};

export function metersToDegrees(lat, lon, deltaMetersLat, deltaMetersLon) {
  const metersPerDegreeLat = 111320; // Approximate meters per degree of latitude
  const metersPerDegreeLon = 111320 * Math.cos(lat * (Math.PI / 180)); // Meters per degree of longitude at a given latitude

  const deltaLat = deltaMetersLat / metersPerDegreeLat;
  const deltaLon = deltaMetersLon / metersPerDegreeLon;

  const newLat = lat + deltaLat;
  const newLon = lon + deltaLon;

  return { lat: newLat, lon: newLon };
}
