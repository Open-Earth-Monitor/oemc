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

interface LinkObject {
  title: string;
  url: string;
}

export function parseAndTransformUseCaseLinks(inputString: string): LinkObject[] {
  // Clean string to make it easier to parse as JSON
  const cleanedString = inputString
    .replace(/'/g, '"') // single quotes to double quotes
    .replace(/\[|\]/g, '') // remove square brackets
    .replace(/},/g, '}|') // add separator "|" between objects
    .replace(/: "/g, ': "') // fix colon-space-quote to colon-quote
    .trim();

  // divide string into objects
  const objectStrings = cleanedString.split('|');

  // parse each object to convert to JSON
  const parsedObjects: LinkObject[] = objectStrings.map((objectString) => {
    // extract title and url from object
    const titleMatch = objectString.match(/"title":\s*"([^"]*)"/);
    const urlMatch = objectString.match(/"url":\s*"([^"]*)"/);

    const title = titleMatch ? titleMatch[1] : '';
    const url = urlMatch ? urlMatch[1] : '';

    if (url) {
      return {
        title: title.trim(),
        url: url.trim(),
      };
    }

    return null;
  });

  return parsedObjects.filter((obj): obj is LinkObject => obj !== null);
}
