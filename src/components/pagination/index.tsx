import range from 'lodash/range';
import { GoTriangleLeft } from 'react-icons/go';

import { cn } from '@/lib/classnames';

import { usePagination } from '@/hooks/pagination';

type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  totalItems: number;
  numButtons: number;
  maxLength: number;
  nextPage: string;
  previousPage: string;
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  totalItems,
  numButtons,
  maxLength,
  nextPage,
  previousPage,
}: PaginationProps) => {
  const lastElement = Math.ceil(totalItems / maxLength);

  const pages = maxLength > numButtons ? range(1, lastElement + 1) : range(1, numButtons + 2);

  const pagesToShow = usePagination(pages.length, numButtons, page);

  const handlePreviousClick = () => {
    setPage(page - 1);
  };

  const handleNextClick = () => {
    setPage(page + 1);
  };

  const handleCurrentPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    void setPage(Number(e.currentTarget.value));
  };

  return (
    <div className="m-auto flex w-full items-center justify-center space-x-5 pt-20">
      <button
        type="button"
        onClick={handlePreviousClick}
        disabled={!previousPage}
        className={cn({ 'cursor-not-allowed opacity-50': !previousPage })}
      >
        <GoTriangleLeft className="h-5 w-5" />
      </button>
      <ol className="flex space-x-8" data-testid="pages-list">
        {pagesToShow.map((d, index) => (
          <li
            key={d}
            data-testid={`pagination-item-${index}`}
            className={cn({
              'm-auto flex h-10 w-10 items-center justify-center rounded-full text-secondary-500':
                true,
              'bg-secondary-500  text-brand-500': d === page,
            })}
          >
            <button type="button" onClick={handleCurrentPage} value={d} disabled={d === '...'}>
              {d}
            </button>
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={handleNextClick}
        disabled={!nextPage}
        className={cn({ 'cursor-not-allowed opacity-50': !nextPage })}
      >
        <GoTriangleLeft className="h-5 w-5 rotate-180" />
      </button>
    </div>
  );
};

export default Pagination;
