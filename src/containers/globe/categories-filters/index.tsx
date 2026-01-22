'use client';

import { ALL_CATEGORY, CATEGORIES } from '@/constants/categories';

import Item from './item';

const CategoriesFilters = () => {
  return (
    <div className="flex space-x-2.5 rounded-full bg-[var(--White-950,rgba(255,255,230,0.05))] p-6 backdrop-blur-[10px]">
      {[...CATEGORIES, ALL_CATEGORY].map(
        (category) => category.id !== 'All' && <Item key={category.id} {...category} />
      )}
    </div>
  );
};

export default CategoriesFilters;
