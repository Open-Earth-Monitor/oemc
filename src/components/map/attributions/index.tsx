import { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/classnames';

import SocialMedia from '@/components/footer/social-media';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

import type { ControlsProps } from './types';

type ControlsPropsWithChildren = PropsWithChildren<ControlsProps>;
const ATTRIBUTION_STYLES =
  'cursor-pointer text-5xl text-[10px] text-secondary-500 shadow-brand-500 drop-shadow-[2px_2px_2px_var(--tw-shadow-color)]';
export const Controls: FC<ControlsPropsWithChildren> = ({
  className = 'absolute bottom-3 space-x-4',
}: ControlsPropsWithChildren) => (
  <div
    className={cn({
      'flex space-x-4': true,
      [className]: !!className,
    })}
  >
    <Dialog>
      <DialogTrigger asChild data-testid="disclaimer">
        <div className={ATTRIBUTION_STYLES}>Disclaimer</div>
      </DialogTrigger>
      <DialogContent className="top-1/2 w-[665px] -translate-y-[50%] transform bg-secondary-500 p-10 text-brand-500">
        <DialogHeader className="space-y-5">
          <DialogTitle asChild>
            <header className="flex items-center justify-between">
              <h2 className="text-5xl font-bold">Disclaimer</h2>
            </header>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-3" data-testid="disclaimer-content">
              <p>
                Funded by the European Union. Views and opinions expressed are however those of the
                author(s) only and do not necessarily reflect those of the European Union or
                European Commission.
              </p>
              <p>
                Neither the European Union nor the granting authority can be held responsible for
                them. The data is provided “as is”. Open-Earth-Monitor Cyberinfrastructure (OEMC)
                project consortium and its suppliers and licensors hereby disclaim all warranties of
                any kind, express or implied, including, without limitation, the warranties of
                merchantability, fitness for a particular purpose and non-infringement.
              </p>
              <p>
                Neither OEMC project Consortium nor its suppliers and licensors, makes any warranty
                that the Website will be error free or that access thereto will be continuous or
                uninterrupted. You understand that you download from, or otherwise obtain content or
                services through, the Website at your own discretion and risk.
              </p>
              <DialogClose className="right-10 flex items-center border-none text-xs font-medium uppercase tracking-[0.96px]">
                Close
              </DialogClose>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://earthmonitor.org/privacy-policy/"
      title="OEMC privacy policy"
      className={ATTRIBUTION_STYLES}
      aria-label="OEMC privacy policy"
      data-testid="privacy-policy-link"
    >
      Privacy Policy
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://earthmonitor.org/contact-us/"
      title="OEMC contact page"
      className={ATTRIBUTION_STYLES}
      aria-label="OEMC contact page"
      data-testid="contact-link"
    >
      Contact us
    </a>
    <Dialog>
      <DialogTrigger asChild data-testid="social-media">
        <div className={ATTRIBUTION_STYLES}>Follow us</div>
      </DialogTrigger>
      <DialogContent className="top-1/2 w-[665px] -translate-y-[50%] transform bg-secondary-500 p-10 text-brand-500">
        <DialogHeader>
          <DialogDescription asChild>
            <SocialMedia theme="dark" />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </div>
);

export default Controls;
