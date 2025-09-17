// import { FC } from 'react';

// import Link from 'next/link';

// import { LayerParsed } from '@/types/layers';

// import { useMonitor } from '@/hooks/monitors';

// import DatasetCard from '@/components/datasets/card';
// import MonitorDialog from '@/components/monitors/dialog';
// import CardHeader from '@/components/sidebar/card-header';

// interface DataSetListProps {
//   data: LayerParsed[];
//   monitorId: string;
// }
// const DatasetList: FC<DataSetListProps> = ({ data, monitorId }) => {
//   const { data: monitor, isLoading: isLoadingMonitor } = useMonitor({ monitor_id: monitorId });
//   const { title, theme, color, id, description, geostories } = monitor || {};

//   return (
//     <>
//       <div className="space-y-6 py-4">
//         <CardHeader
//           theme={theme}
//           title={title}
//           type="monitor"
//           color={color}
//           id={id}
//           className="space-y-4"
//           loading={isLoadingMonitor}
//           bbox={monitor?.monitor_bbox}
//         />
//         <p>{description}</p>
//       </div>

//       <MonitorDialog {...monitor} />
//       <div className="space-y-6 py-8">
//         {/* Datasets cards */}
//         {!!data?.length && (
//           <div className="border-t border-white-900">
//             <h2 className="py-2 font-medium">Datasets</h2>
//             <ul className="space-y-4 sm:space-y-6" data-testid="datasets-list">
//               {data?.map((dataset) => {
//                 return (
//                   <li key={dataset.layer_id}>
//                     <DatasetCard
//                       {...dataset}
//                       id={dataset.layer_id}
//                       isGeostory={false}
//                       color={color}
//                     />
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         )}
//         {!!geostories?.length && (
//           <div className="border-t border-white-900">
//             <h2 className="py-2 font-medium">Geostories</h2>
//             <ul className="space-y-4 sm:space-y-6" data-testid="datasets-list">
//               {geostories.map((geostory) => {
//                 return (
//                   <Link href={`/explore/geostory/${geostory.id}`} key={geostory.id}>
//                     <li key={geostory.id} className="font-bold underline">
//                       {geostory.title}
//                     </li>
//                   </Link>
//                 );
//               })}
//             </ul>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default DatasetList;
