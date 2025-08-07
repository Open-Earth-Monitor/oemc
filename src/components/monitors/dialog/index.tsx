import Link from 'next/link';
import { useParams } from 'next/navigation';

import { LuInfo } from 'react-icons/lu';

import cn from '@/lib/classnames';

import type { Monitor } from '@/types/monitors';

import { postWebTraffic } from '@/hooks/web-traffic';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

import UseCases from './knowledge-package';

type MonitorDialogProps = Partial<Monitor>;

const MonitorDialog: React.FC<MonitorDialogProps> = ({
  id,
  title,
  description,
  use_case_link,
  responsible_partner_name,
  responsible_partner_url,
}) => {
  const params = useParams();
  const monitorId = params?.monitor_id;
  const handleClick = () => {
    postWebTraffic({
      monitor_id: id,
    });
    console.info('WT7 -', 'monitors', id);
  };

  const hasValidLink =
    Array.isArray(use_case_link) && use_case_link.some(({ title, url }) => Boolean(title || url));

  return (
    <Dialog>
      <DialogTrigger
        data-testid={`card-button-${id}`}
        className="flex items-center space-x-3 text-xs font-bold"
      >
        <LuInfo className="h-6 w-6" />
        <span>More info</span>
      </DialogTrigger>
      <DialogContent
        data-testid={`monitor-card-${id}`}
        className="w-full bg-secondary-500 text-brand-500 sm:w-[665px]"
      >
        <DialogHeader className="space-y-6">
          <DialogTitle asChild>
            <header className="space-y-6 py-6 sm:py-0">
              <h2 data-testid="monitor-title" className="inline-block pr-6 text-[28px] font-medium">
                {title}
              </h2>
              <div
                data-testid="monitor-description"
                className="flex flex-wrap font-inter leading-[25px]"
              >
                {description}
              </div>
            </header>
          </DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className="border-t border-brand-500 py-6">
                <dl className="space-y-2 py-2">
                  <div className="flex flex-col space-y-4">
                    <dt className="whitespace-nowrap text-xl font-medium">Partner:</dt>
                    <dd className="text-sm font-bold">
                      <a href={responsible_partner_url}>{responsible_partner_name}</a>
                    </dd>
                  </div>
                </dl>
              </div>

              {hasValidLink && <UseCases items={use_case_link} />}

              <DialogClose className="right-4 top-4 flex h-4 items-center space-x-2 text-xs font-medium uppercase tracking-[0.96px] text-brand-500 sm:right-10 sm:top-10" />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MonitorDialog;
