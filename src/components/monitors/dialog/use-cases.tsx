import { HiOutlineGlobeAlt } from 'react-icons/hi';
import type { Monitor } from '@/types/monitors';

const UseCasesUnit: React.FC<{ title: string; url: string }> = ({ title, url }) => (
  <li>
    <a
      href={url}
      className="underline"
      target="_blank"
      rel="noopener noreferrer"
      title={url ? title : 'empty link'}
    >
      {title}
    </a>
  </li>
);

const UseCases: React.FC<{ items: Monitor['use_case_link'] }> = ({ items }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-brand-500 py-6">
      <h3 className="flex items-center space-x-2">
        <HiOutlineGlobeAlt className="h-6 w-6" />
        <span className="text-2xl font-bold">Use cases</span>
      </h3>
      <ul className="space-y-2 py-2 pl-8 font-bold">
        {items.map(({ url, title }, index) => (
          <UseCasesUnit key={index} title={title} url={url} />
        ))}
      </ul>
    </div>
  );
};

export default UseCases;
