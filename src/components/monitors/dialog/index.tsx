import Link from 'next/link';
import { useParams } from 'next/navigation';

import { HiOutlineGlobeAlt } from 'react-icons/hi';

import cn from '@/lib/classnames';

import type { Monitor } from '@/types/monitors';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { isArray } from 'lodash-es';
import { usePostWebTraffic } from '@/hooks/web-traffic';

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
    // usePostWebTraffic({
    //   monitor_id: id,
    // });
    console.info('WT7 -', 'monitors', id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="light"
          data-testid={`card-button-${id}`}
          className="h-12 max-w-fit p-4 text-base sm:h-9 sm:text-xs"
        >
          Know more
        </Button>
      </DialogTrigger>
      <DialogContent
        data-testid={`monitor-card-${id}`}
        className="w-full bg-secondary-500 text-brand-500 sm:w-[665px]"
      >
        <DialogHeader className="space-y-6">
          <DialogTitle asChild>
            <header className="space-y-6 py-6 sm:py-0">
              <h2
                data-testid="monitor-title"
                className="inline-block pr-6 text-2xl font-bold sm:text-6xl"
              >
                {title}
              </h2>
              <div
                data-testid="monitor-description"
                className="font-inter flex flex-wrap leading-[25px]"
              >
                {description}
              </div>
            </header>
          </DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className="border-t border-brand-500 py-6">
                <dl className="space-y-2 py-2">
                  <div className="flex space-x-2">
                    <dt className="whitespace-nowrap font-bold">Partner:</dt>
                    <dd>
                      <a href={responsible_partner_url} className="underline">
                        {responsible_partner_name}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="border-t border-brand-500 py-6">
                <h3 className="flex items-center space-x-2">
                  <HiOutlineGlobeAlt className="h-6 w-6" />
                  <span className="text-2xl font-bold">Use cases</span>
                </h3>
                {isArray(use_case_link) && use_case_link?.length > 0 && (
                  <ul className="space-y-2 py-2 pl-8 font-bold">
                    {use_case_link.map(({ url, title }) => (
                      <li key={title}>
                        <a
                          href={url}
                          className="underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {monitorId !== id && (
                <Link
                  href={`/map/${id}/datasets`}
                  data-testid="monitor-button"
                  className={cn(
                    'mt-3 flex min-h-[38px] w-full items-center justify-center space-x-2 border-2 border-brand-500 px-6 py-2 text-xs font-bold transition-colors hover:bg-secondary-500/20'
                  )}
                  onClick={handleClick}
                >
                  Launch monitor
                </Link>
              )}
              <DialogClose className="right-4 top-4 flex h-4 items-center space-x-2 text-xs font-medium uppercase tracking-[0.96px] text-brand-500 sm:right-10 sm:top-10">
                Close
              </DialogClose>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MonitorDialog;
