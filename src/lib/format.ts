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

export function metersToDegrees(
  lat: number,
  lon: number,
  deltaMetersLat: number,
  deltaMetersLon: number
) {
  const metersPerDegreeLat = 111320; // Approximate meters per degree of latitude
  const metersPerDegreeLon = 111320 * Math.cos(lat * (Math.PI / 180)); // Meters per degree of longitude at a given latitude

  const deltaLat = deltaMetersLat / metersPerDegreeLat;
  const deltaLon = deltaMetersLon / metersPerDegreeLon;

  const newLat = lat + deltaLat;
  const newLon = lon + deltaLon;

  return { lat: newLat, lon: newLon };
}

export function transformToBBoxArray(str: string): [number, number, number, number] | false {
  const MIN_X = -20026376.39;
  const MAX_X = 20026376.39;
  const MIN_Y = -20048966.1;
  const MAX_Y = 20048966.1;

  try {
    // Convert the string to an array of numbers
    const bboxArray = str
      .split(',')
      .map((item) => item.trim()) // Trim extra spaces
      .map(Number); // Convert to numbers

    // Check if all items are valid numbers and we have exactly 4 numbers
    if (bboxArray.length === 4 && bboxArray.every((num) => !isNaN(num))) {
      const [xMin, yMin, xMax, yMax] = bboxArray;

      // Validate that the coordinates are within the EPSG:3857 bounds
      const isValidX = xMin >= MIN_X && xMax <= MAX_X;
      const isValidY = yMin >= MIN_Y && yMax <= MAX_Y;
      const isCorrectOrder = xMin < xMax && yMin < yMax; // Make sure the bbox is valid

      if (isValidX && isValidY && isCorrectOrder) {
        return bboxArray as [number, number, number, number]; // Valid bbox
      }
    }
    return false; // Return false if it's not a valid bbox
  } catch (error) {
    return false; // Return false if any error occurs
  }
}

export function unescapeHtml(str: string) {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
