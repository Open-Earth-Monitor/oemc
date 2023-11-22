export function usePagination(n: number, x: number, selected: number): (number | string)[] {
  const pages: (number | string)[] = [];

  // Always include the first and last pages
  pages.push(1);
  if (n === 1) {
    return pages; // Only one page available
  }

  const maxVisiblePages = x - 2; // Subtract first and last pages from count

  // Determine range of pages to display
  let startPage = Math.max(2, Math.min(selected - 1, n - maxVisiblePages));
  let endPage = Math.min(n - 1, Math.max(selected + 1, startPage + maxVisiblePages - 1));

  // Adjust start and end pages if necessary
  if (endPage - startPage < maxVisiblePages - 1) {
    if (startPage === 2) {
      endPage = startPage + maxVisiblePages - 1;
    } else {
      startPage = endPage - maxVisiblePages + 1;
    }
  }

  // Insert ellipsis if there is a gap
  if (startPage > 2) pages.push('...');
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  if (endPage < n - 1) pages.push('...');

  pages.push(n); // Add the last page

  return pages;
}
