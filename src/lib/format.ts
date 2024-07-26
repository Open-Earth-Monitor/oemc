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
