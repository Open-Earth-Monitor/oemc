import range from 'lodash/range';
import { GoTriangleLeft } from 'react-icons/go';
import { HiEllipsisHorizontal } from 'react-icons/hi2';

import { cn } from '@/lib/classnames';

import PaginationItem from './item';

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
  maxLength,
  nextPage,
  previousPage,
}: PaginationProps) => {
  const lastElement = Math.ceil(totalItems / maxLength);

  const pages = range(1, lastElement + 1);
  const pagesToShow = pages.slice(Math.max(page - 2, 1), Math.min(page + 1, lastElement - 1));

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
    <div className="spce-x-3 m-auto flex w-full items-center justify-center pt-[50px] sm:space-x-5 sm:pt-20">
      <button
        type="button"
        onClick={handlePreviousClick}
        disabled={!previousPage}
        className={cn({ 'cursor-not-allowed opacity-50': !previousPage })}
      >
        <GoTriangleLeft className="h-5 w-5" />
      </button>
      <ol className="flex items-center space-x-3 sm:space-x-8" data-testid="pages-list">
        {/* First page */}
        <PaginationItem key={1} item={1} page={page} handleCurrentPage={handleCurrentPage} />
        {page - 1 > 1 && <HiEllipsisHorizontal />}
        {/* Other pages */}
        {pagesToShow.map((d) => (
          <PaginationItem key={d} item={d} page={page} handleCurrentPage={handleCurrentPage} />
        ))}
        {page + 2 < lastElement && <HiEllipsisHorizontal />}
        {/* Last page */}
        <PaginationItem
          key={lastElement}
          item={lastElement}
          page={page}
          handleCurrentPage={handleCurrentPage}
        />
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
