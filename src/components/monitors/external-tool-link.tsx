import { HiOutlineExternalLink } from 'react-icons/hi';

import { cn } from '@/lib/classnames';

import type { Monitor } from '@/types/monitors';

type ExternalToolLinkProps = {
  tool?: Monitor['external_tool'];
  className?: string;
};

/**
 * Link to the dedicated application of a monitor, shown below its description.
 * The underline fades in on hover, like the other links in the app.
 */
const ExternalToolLink: React.FC<ExternalToolLinkProps> = ({ tool, className }) => {
  if (!tool?.url) return null;

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="monitor-external-tool-link"
      className={cn(
        'inline-flex items-center gap-2 rounded font-bold underline decoration-transparent transition-all duration-300 ease-in-out hover:decoration-current focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-green',
        className
      )}
    >
      <HiOutlineExternalLink className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span>
        {tool.title}
        <span className="sr-only"> (opens in a new tab)</span>
      </span>
    </a>
  );
};

export default ExternalToolLink;
