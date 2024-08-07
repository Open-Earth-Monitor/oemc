import cn from '@/lib/classnames';

type PaginationItemProps = {
  item: number;
  page: number;
  handleCurrentPage: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const PaginationItem = ({ item, page, handleCurrentPage }: PaginationItemProps) => {
  return (
    <li key={item} data-testid={`pagination-item-${item}`}>
      <button
        type="button"
        className={cn({
          'm-auto flex h-10 w-10 items-center justify-center rounded-full text-secondary-500': true,
          'hover:bg-secondary-900': item !== page,
          'bg-secondary-500 text-brand-500': item === page,
        })}
        onClick={handleCurrentPage}
        value={item}
        disabled={item === page}
      >
        {item}
      </button>
    </li>
  );
};

export default PaginationItem;
