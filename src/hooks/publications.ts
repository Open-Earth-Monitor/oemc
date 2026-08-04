import { useMemo } from 'react';

import { useQueries } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { APIZenodo, APIZotero } from 'services/api';

/** OEMC community on Zenodo and the project's public Zotero group. */
const ZENODO_COMMUNITY = 'oemc-project';
const ZOTERO_GROUP_ID = '5705036';

/** Zenodo answers 400 Bad Request to anything larger. */
const ZENODO_MAX_PAGE_SIZE = 25;

/** Zotero caps `limit` at 100 and silently truncates above it. */
const ZOTERO_MAX_PAGE_SIZE = 100;

/** Publications per source in the landing feed when the caller does not say. */
export const DEFAULT_PUBLICATIONS_PER_SOURCE = 3;

/**
 * Everything a single request can bring back from both libraries at once —
 * Zenodo's ceiling is the binding one. Used by the live updates listing, which
 * shows all it can rather than a handful.
 */
export const MAX_PUBLICATIONS_PER_SOURCE = ZENODO_MAX_PAGE_SIZE;

export type PublicationSource = 'zenodo' | 'zotero';

/** Shape both APIs are normalized into so the card renders one thing. */
export type Publication = {
  id: string;
  source: PublicationSource;
  title: string;
  authors: string[];
  /** Raw date string from the source — freeform on Zotero, `YYYY-MM-DD` on Zenodo. */
  date: string | null;
  url: string;
  /** "Dataset", "Journal Article", … Used as a badge; null when the source omits it. */
  type: string | null;
  /** Plain-text abstract, when the source provides one. */
  description?: string | null;
};

type ZenodoRecord = {
  id: number;
  doi?: string;
  links?: { self_html?: string; doi?: string };
  metadata?: {
    title?: string;
    publication_date?: string;
    description?: string;
    creators?: { name?: string }[];
    resource_type?: { title?: string };
  };
};

type ZenodoResponse = { hits?: { hits?: ZenodoRecord[] } };

type ZoteroCreator = { firstName?: string; lastName?: string; name?: string };

type ZoteroItem = {
  key: string;
  links?: { alternate?: { href?: string } };
  data?: {
    key?: string;
    title?: string;
    itemType?: string;
    abstractNote?: string;
    date?: string;
    url?: string;
    DOI?: string;
    creators?: ZoteroCreator[];
  };
};

const DEFAULT_QUERY_OPTIONS = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: false,
  staleTime: Infinity,
};

/** "Last, First" as Zenodo stores it — displayed verbatim, it is already human-readable. */
const parseZenodoAuthors = (creators: ZenodoRecord['metadata']['creators']) =>
  (creators ?? []).map((creator) => creator?.name).filter(Boolean);

const parseZoteroAuthors = (creators: ZoteroCreator[]) =>
  (creators ?? [])
    .map(
      (creator) =>
        creator?.name || [creator?.lastName, creator?.firstName].filter(Boolean).join(', ')
    )
    .filter(Boolean);

/** `journalArticle` → `Journal Article`. Zotero itemTypes are camelCase. */
const humanizeZoteroItemType = (itemType?: string) => {
  if (!itemType) return null;
  const spaced = itemType.replace(/([A-Z])/g, ' $1').trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

/** The entities Zenodo abstracts actually use; anything else is left as-is. */
const HTML_ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': "'",
  '&nbsp;': ' ',
  '&ndash;': '–',
  '&mdash;': '—',
  '&rsquo;': '’',
  '&lsquo;': '‘',
  '&ldquo;': '“',
  '&rdquo;': '”',
};

/**
 * Zenodo abstracts are HTML; the cards render text, so tags are dropped and the
 * entities left behind are decoded (`2000&ndash;2022` would otherwise show raw).
 */
const stripHtml = (html?: string) =>
  html
    ? html
        .replace(/<[^>]*>/g, ' ')
        .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
        .replace(/&[a-z]+;/gi, (entity) => HTML_ENTITIES[entity.toLowerCase()] ?? entity)
        .replace(/\s+/g, ' ')
        .trim()
    : null;

const normalizeZenodoRecord = (record: ZenodoRecord): Publication => ({
  id: `zenodo-${record.id}`,
  source: 'zenodo',
  title: record.metadata?.title ?? 'Untitled record',
  authors: parseZenodoAuthors(record.metadata?.creators),
  date: record.metadata?.publication_date ?? null,
  // `self_html` is the canonical record page; the id-based URL is the fallback
  // in case the field is missing from the response.
  url: record.links?.self_html ?? `https://zenodo.org/records/${record.id}`,
  type: record.metadata?.resource_type?.title ?? null,
  description: stripHtml(record.metadata?.description),
});

const normalizeZoteroItem = (item: ZoteroItem): Publication => {
  const doi = item.data?.DOI;

  return {
    id: `zotero-${item.key}`,
    source: 'zotero',
    title: item.data?.title ?? 'Untitled publication',
    authors: parseZoteroAuthors(item.data?.creators),
    date: item.data?.date ?? null,
    // Prefer the publisher link, then the DOI, and only fall back to the Zotero
    // page — readers want the paper, not the library entry.
    url:
      item.data?.url ||
      (doi ? `https://doi.org/${doi}` : undefined) ||
      item.links?.alternate?.href ||
      `https://www.zotero.org/groups/${ZOTERO_GROUP_ID}/items/${item.key}`,
    type: humanizeZoteroItemType(item.data?.itemType),
    // `abstractNote` is plain text and an empty string when the entry has none.
    description: item.data?.abstractNote?.trim() || null,
  };
};

/** Zenodo's own `newest` sort is by upload time, which is not the publication date. */
export const byPublicationDateDesc = (a: Publication, b: Publication) => {
  const timeA = a.date ? new Date(a.date).getTime() : NaN;
  const timeB = b.date ? new Date(b.date).getTime() : NaN;

  // Undated records sink to the bottom rather than jumping to the top.
  if (Number.isNaN(timeA) && Number.isNaN(timeB)) return 0;
  if (Number.isNaN(timeA)) return 1;
  if (Number.isNaN(timeB)) return -1;

  return timeB - timeA;
};

const fetchZoteroItems = (limit: number) =>
  APIZotero.request({
    method: 'GET',
    url: `/groups/${ZOTERO_GROUP_ID}/items/top`,
    params: { limit, sort: 'date', direction: 'desc', format: 'json', v: 3 },
  }).then((response: AxiosResponse<ZoteroItem[]>) =>
    (response.data ?? []).map(normalizeZoteroItem).sort(byPublicationDateDesc)
  );

const fetchZenodoRecords = (size: number) =>
  APIZenodo.request({
    method: 'GET',
    url: '/records',
    params: { communities: ZENODO_COMMUNITY, sort: 'newest', size },
  }).then((response: AxiosResponse<ZenodoResponse>) =>
    (response.data?.hits?.hits ?? []).map(normalizeZenodoRecord).sort(byPublicationDateDesc)
  );

/**
 * The most recent publications from both sources, merged and sorted by
 * publication date, newest first.
 *
 * `perSource` is a per-library count, not a total: asking for 3 gives up to 3
 * Zenodo records and up to 3 Zotero items, so the feed always mixes both rather
 * than being swept by whichever library published last.
 *
 * The two queries are independent on purpose: if one source is down the other
 * still renders, so the section degrades to one library instead of vanishing.
 */
export function useLatestPublications({
  perSource = DEFAULT_PUBLICATIONS_PER_SOURCE,
}: { perSource?: number } = {}) {
  const zenodoSize = Math.min(perSource, ZENODO_MAX_PAGE_SIZE);
  const zoteroLimit = Math.min(perSource, ZOTERO_MAX_PAGE_SIZE);

  const results = useQueries({
    queries: [
      {
        queryKey: ['publications', 'zenodo', 'list', ZENODO_COMMUNITY, zenodoSize],
        queryFn: () => fetchZenodoRecords(zenodoSize),
        ...DEFAULT_QUERY_OPTIONS,
      },
      {
        queryKey: ['publications', 'zotero', 'list', ZOTERO_GROUP_ID, zoteroLimit],
        queryFn: () => fetchZoteroItems(zoteroLimit),
        ...DEFAULT_QUERY_OPTIONS,
      },
    ],
  });

  const [zenodo, zotero] = results;

  // React Query keeps each `data` reference stable between renders, so keying the
  // merge on them hands callers a stable array too — without this every render
  // produces a new list and any downstream memo is defeated.
  const data = useMemo(
    () =>
      [...(zenodo.data ?? []), ...(zotero.data ?? [])]
        .sort(byPublicationDateDesc)
        // Zenodo mirrors some Zotero entries; the sources publish independently
        // so the same paper can arrive twice under different ids.
        .filter(
          (publication, index, all) =>
            all.findIndex((other) => other.title === publication.title) === index
        ),
    [zenodo.data, zotero.data]
  );

  return {
    data,
    isLoading: results.some((result) => result.isLoading),
    isError: results.every((result) => result.isError),
  };
}
