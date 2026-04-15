import { CATEGORIES } from '@/constants/categories';

import Item from './item';

export const CategoriesFiltersContent = () => (
  <>
    <div className="text-white-500">Filter by Geostories by category: </div>

    <div className="flex flex-wrap gap-4">
      {CATEGORIES.map((category) => (
        <Item key={category.id} {...category} theme="plain" />
      ))}
    </div>
  </>
);
