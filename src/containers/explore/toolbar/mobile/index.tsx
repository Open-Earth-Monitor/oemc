'use client';
import { useState } from 'react';

import { ChevronDownIcon, ChevronLeftIcon } from 'lucide-react';

import cn from '@/lib/classnames';

import { Theme } from '@/constants/themes';

import { useDatasets } from '@/hooks/datasets';
import { useSyncDatasetType, useSyncTheme } from '@/hooks/sync-query';

import Badge from '@/components/badge';
import FilterByDatasetType from '@/components/datasets-grid/filters';
import Loading from '@/components/loading';
import CardList from '@/components/sidebar/card-list';
import SidebarCheckbox from '@/components/sidebar/checkbox';
import SortBy from '@/components/sort-by';
import { THEMES } from '@/components/theme-filter/constants';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function MobileExploreToolbar() {
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

  const handleClick = (type: Theme | 'All') => {
    setTheme(type);
  };
  const toggle = () => setIsOpen(!isOpen);
  const showTheme = !!theme;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full text-sm">
      {/* Drawer / Sheet */}
      <div
        className="
          z-50 max-h-[80vh] overflow-auto
           bg-black-500 text-white-500
          transition-transform
          "
        style={{
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cn('relative p-4', showTheme && 'min-h-[80vh]')}>
          {/* Theme Panel */}
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
                  <span>{results?.length}</span>
                  {}
                  {!isLoading && isFetched && (
                    <span>{results?.length === 1 ? 'result' : 'results'}</span>
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
              {!isLoading && isFetched && (
                <CardList className="px-6" data={results} showMore={showDetail} />
              )}
            </ScrollArea>
          </div>

          {/* Catalogue Panel */}
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
              {THEMES.map((theme) => (
                <li key={theme.id} className="flex justify-center">
                  <Button
                    variant="background"
                    onClick={() => handleClick(theme.id)}
                    className={cn(
                      'flex flex-col justify-center gap-2 bg-transparent text-xs hover:bg-transparent'
                    )}
                  >
                    <span className="rounded-full bg-white-900/10 p-2">
                      {theme.Icon && <theme.Icon />}
                    </span>
                    <span className="!m-0">{theme.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Button
        className={cn({
          'z-60 relative flex w-full justify-between rounded-none border-none bg-black-500 px-6 py-2 text-sm text-white-500':
            true,
          'bg-accent-green text-black-500': isOpen,
        })}
        onClick={toggle}
      >
        <span>Explore our Monitors & Geostories</span>
        <ChevronDownIcon
          size={24}
          className={cn({
            'text-accent-green transition-all': true,
            'rotate-180 text-black-500': isOpen,
          })}
        />
      </Button>
    </div>
  );
}
