'use client';

import { ALL_CATEGORY, CATEGORIES } from '@/constants/categories';

import Item from './item';

const CategoriesFilters = () => {
  return (
    <div className="m-auto space-y-4">
      <div className="m-auto flex w-fit flex-col items-center justify-center">
        <p className="text-white-700">Select a category</p>
        <p className="text-3xl font-medium text-white-500">Explore our geostories</p>
      </div>
      <div className="flex space-x-2.5 rounded-full bg-white-950 p-6 backdrop-blur-[10px] ">
        {[...CATEGORIES, ALL_CATEGORY].map(
          (category) => category.id !== 'All' && <Item key={category.id} {...category} />
        )}
      </div>
    </div>
  );
};

export default CategoriesFilters;
