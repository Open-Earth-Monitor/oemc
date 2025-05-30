import { useSyncDatasetType } from '@/hooks/sync-query';

import FilterByDatasetType from '../datasets-grid/filters';

function SidebarSelect() {
  const [currentDataset, setDatasetType] = useSyncDatasetType();

  return <FilterByDatasetType active={currentDataset} handleDatasetTypeChange={setDatasetType} />;
}

export default SidebarSelect;
