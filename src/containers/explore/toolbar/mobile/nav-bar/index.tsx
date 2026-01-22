'use client';

import React, { useCallback, useState } from 'react';
import { ChevronDownIcon, ChevronLeftIcon } from 'lucide-react';

import cn from '@/lib/classnames';

import { useDatasets } from '@/hooks/datasets';
import { useSyncDatasetType, useSyncTheme } from '@/hooks/sync-query';

import Badge from '@/components/badge';
import FilterByDatasetType from '@/components/filters-by-dataset-type/desktop';
import Loading from '@/components/loading';
import CardList from '@/components/sidebar/card-list';
import SidebarCheckbox from '@/components/sidebar/checkbox';
import SortBy from '@/components/sort-by';
import { ALL_CATEGORY, CATEGORIES } from '@/constants/categories';
import type { CategoryId } from '@/constants/categories';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const MobileExploreNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDataset, setDatasetType] = useSyncDatasetType();
  const [theme, setTheme] = useSyncTheme();

  const {
    results,
    isLoading,
    isFetched,
    sortingCriteria,
    showDetail,
    setShowDetail,
    setSortingCriteria,
  } = useDatasets();

  const handleClick = useCallback(
    (id: CategoryId | typeof ALL_CATEGORY.id) => {
      setTheme(id);
    },
    [setTheme]
  );

  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const showTheme = theme !== null && theme !== undefined;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full text-sm">
      <div
        className="z-50 max-h-[80vh] overflow-auto bg-black-500 text-white-500 transition-transform"
        style={{ transform: isOpen ? 'translateY(0)' : 'translateY(100%)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cn('relative p-4', showTheme && 'min-h-[80vh]')}>
          <div
            className={cn(
              'absolute inset-0 overflow-hidden transition-all duration-300 ease-in-out',
              showTheme
                ? 'pointer-events-auto z-10 scale-100 opacity-100'
                : 'pointer-events-none z-0 scale-95 opacity-0'
            )}
          >
            <header className="sticky">
              <section className="flex items-center justify-between bg-black-300 px-6 py-2">
                <Button
                  variant="background"
                  className="bg-transparent p-0 hover:bg-transparent"
                  onClick={() => setTheme(null)}
                >
                  <ChevronLeftIcon className="text-accent-green" />
                  <span>Catalogue</span>
                </Button>

                <Badge>
                  <span>{results?.length ?? 0}</span>
                  {!isLoading && isFetched && (
                    <span>{(results?.length ?? 0) === 1 ? 'result' : 'results'}</span>
                  )}
                </Badge>
              </section>

              <section className="space-y-6 p-6">
                <FilterByDatasetType
                  active={currentDataset}
                  handleDatasetTypeChange={setDatasetType}
                  className="gap-10"
                />
                <div className="flex items-center justify-between">
                  <SidebarCheckbox setShowDetail={setShowDetail} />
                  <SortBy
                    sortingCriteria={sortingCriteria}
                    handleSortingCriteria={setSortingCriteria}
                  />
                </div>
              </section>
            </header>

            <ScrollArea className="h-full">
              {isLoading && !isFetched && <Loading />}
              {!isLoading && isFetched && results && (
                <CardList className="px-6 pb-44" data={results} showMore={showDetail} />
              )}
            </ScrollArea>
          </div>

          <div
            className={cn(
              'transition-all duration-300 ease-in-out',
              showTheme
                ? 'pointer-events-none absolute inset-0 z-0 scale-95 opacity-0'
                : 'pointer-events-auto relative z-10 scale-100 opacity-100'
            )}
          >
            <header className="mb-8">
              <h2>Catalogue</h2>
            </header>

            <ul className="grid grid-cols-3">
              {CATEGORIES.map((t) => (
                <li key={t.id} className="flex justify-center">
                  <Button
                    variant="background"
                    onClick={() => handleClick(t.id)}
                    className={cn(
                      'flex flex-col justify-center gap-2 bg-transparent text-xs hover:bg-transparent'
                    )}
                  >
                    <span className="rounded-full bg-white-900/10 p-2">
                      {t.Icon ? <t.Icon /> : null}
                    </span>
                    <span className="!m-0">{t.label}</span>
                  </Button>
                </li>
              ))}

              <li key={ALL_CATEGORY.id} className="flex justify-center">
                <Button
                  variant="background"
                  onClick={() => handleClick(ALL_CATEGORY.id)}
                  className={cn(
                    'flex flex-col justify-center gap-2 bg-transparent text-xs hover:bg-transparent'
                  )}
                >
                  <span className="rounded-full bg-white-900/10 p-2">
                    {ALL_CATEGORY.Icon ? <ALL_CATEGORY.Icon /> : null}
                  </span>
                  <span className="!m-0">{ALL_CATEGORY.label}</span>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Button
        className={cn(
          'z-60 relative flex h-[60px] w-full justify-between rounded-none border-none bg-black-500 px-6 py-2 text-sm text-white-500',
          isOpen && 'bg-accent-green text-black-500'
        )}
        onClick={toggle}
      >
        <span>Explore our Monitors & Geostories</span>
        <ChevronDownIcon
          size={24}
          className={cn('text-accent-green transition-all', isOpen && 'rotate-180 text-black-500')}
        />
      </Button>
    </div>
  );
};

export default MobileExploreNavbar;
