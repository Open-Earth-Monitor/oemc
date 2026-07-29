import { useCallback } from 'react';

import { useTrackEvent, type DatasetType } from '@/lib/analytics';

import { useSyncDatasetType } from '@/hooks/sync-query';

import FilterByDatasetType from '@/components/filters-by-dataset-type/desktop';

function SidebarSelect() {
  const [currentDataset, setDatasetType] = useSyncDatasetType();
  const track = useTrackEvent();

  const handleDatasetTypeChange = useCallback(
    (type: DatasetType) => {
      track('Dataset Type Filter', { props: { dataset_type: type, source: 'explore-sidebar' } });
      setDatasetType(type);
    },
    [setDatasetType, track]
  );

  return (
    <FilterByDatasetType
      active={currentDataset}
      handleDatasetTypeChange={handleDatasetTypeChange}
    />
  );
}

export default SidebarSelect;
