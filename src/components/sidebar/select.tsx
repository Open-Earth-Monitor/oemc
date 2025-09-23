import { useSyncDatasetType } from '@/hooks/sync-query';

import FilterByDatasetType from '@/components/filters-by-dataset-type/desktop';

function SidebarSelect() {
  const [currentDataset, setDatasetType] = useSyncDatasetType();

  return <FilterByDatasetType active={currentDataset} handleDatasetTypeChange={setDatasetType} />;
}

export default SidebarSelect;
