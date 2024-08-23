import { MonitorParsed } from '@/types/monitors';

import { TableCell } from '@/components/ui/table';

import { MonitorLink } from './monitor';
import { GeostoriesLink } from './geostory';

const Item = ({ data }: { data: MonitorParsed }) => {
  return (
    <>
      <TableCell>
        <MonitorLink {...data} />
      </TableCell>
      <TableCell>
        <GeostoriesLink {...data} />
      </TableCell>
    </>
  );
};

export default Item;
