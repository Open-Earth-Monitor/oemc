import { MonitorParsed } from '@/types/monitors';

import { TableCell } from '@/components/ui/table';

import { GeostoriesLink } from './geostory';
import { MonitorLink } from './monitor';

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
