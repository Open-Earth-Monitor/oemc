'use client';

import { createElement, Fragment, ReactNode, useEffect, useMemo, useState } from 'react';

import Image from 'next/image';

import { useCesium } from 'resium';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const POLL_MS = 500;

const ALLOWED_TAGS = new Set(['A', 'SPAN', 'B', 'I', 'EM', 'STRONG', 'BR', 'SUP', 'SUB']);
const ALLOWED_ATTRS: Record<string, Set<string>> = {
  A: new Set(['href', 'target', 'rel', 'title']),
};
const SAFE_URL = /^(https?:|mailto:)/i;

function renderSafeNode(node: ChildNode, key: number): ReactNode {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? '';
  if (node.nodeType !== Node.ELEMENT_NODE) return null;

  const el = node as Element;
  const tag = el.tagName;
  const children = Array.from(el.childNodes).map((child, i) => renderSafeNode(child, i));

  if (!ALLOWED_TAGS.has(tag)) {
    return createElement(Fragment, { key }, ...children);
  }

  const props: Record<string, string> = { key: String(key) };
  const allowed = ALLOWED_ATTRS[tag];
  if (allowed) {
    for (const attr of Array.from(el.attributes)) {
      if (!allowed.has(attr.name)) continue;
      if (attr.name === 'href' && !SAFE_URL.test(attr.value)) continue;
      props[attr.name] = attr.value;
    }
  }
  if (tag === 'A') {
    props.target = props.target || '_blank';
    props.rel = 'noopener noreferrer';
  }

  return createElement(tag.toLowerCase(), props, ...children);
}

function renderSafeHtml(html: string): ReactNode {
  if (typeof window === 'undefined') return null;
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
  const root = doc.body.firstChild;
  if (!root) return null;
  return Array.from(root.childNodes).map((child, i) => renderSafeNode(child, i));
}

function toArray(maybeArray: unknown): unknown[] {
  if (!maybeArray) return [];
  if (Array.isArray(maybeArray)) return maybeArray;
  const candidate = (maybeArray as { values?: unknown }).values;
  if (Array.isArray(candidate)) return candidate;
  if (typeof candidate === 'function') {
    try {
      return Array.from((candidate as () => Iterable<unknown>).call(maybeArray));
    } catch {
      return [];
    }
  }
  return [];
}

function collectCreditHtml(creditDisplay: unknown): string[] {
  if (!creditDisplay) return [];
  const cd = creditDisplay as Record<string, unknown>;
  const frame = cd._currentFrameCredits as Record<string, unknown> | undefined;
  const sources = [
    frame?.lightboxCredits,
    frame?.screenCredits,
    cd._defaultCredits,
    cd._defaultCredit ? [cd._defaultCredit] : undefined,
  ];

  const seen = new Set<string>();
  const out: string[] = [];
  for (const source of sources) {
    for (const entry of toArray(source)) {
      const credit = (entry as { credit?: { html?: string }; html?: string })?.credit ?? entry;
      const html = (credit as { html?: string })?.html?.trim();
      if (html && !seen.has(html)) {
        seen.add(html);
        out.push(html);
      }
    }
  }
  return out;
}

export default function CesiumAttribution() {
  const { viewer } = useCesium();
  const [credits, setCredits] = useState<string[]>([]);
  const rendered = useMemo(
    () => credits.map((html) => ({ html, node: renderSafeHtml(html) })),
    [credits]
  );

  useEffect(() => {
    if (!viewer) return;
    let cancelled = false;
    let lastSignature = '';

    const tick = () => {
      if (cancelled) return;
      if (!viewer || viewer.isDestroyed?.()) return;
      const next = collectCreditHtml(viewer.creditDisplay);
      const sig = next.join('||');
      if (sig !== lastSignature) {
        lastSignature = sig;
        setCredits(next);
      }
    };

    tick();
    const id = window.setInterval(tick, POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [viewer]);

  return (
    <div
      data-testid="cesium-attribution"
      className="pointer-events-auto absolute bottom-2 right-5 z-10 flex items-center gap-3 md:bottom-[60px] xl:bottom-2"
    >
      <a
        href="https://cesium.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Cesium"
        className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-green"
      >
        <Image
          src="/cesium/Assets/Images/cesium_credit.png"
          alt="Cesium"
          width={88}
          height={22}
          priority
          unoptimized
        />
      </a>
      {credits.length > 0 && (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button
              type="button"
              data-testid="cesium-data-attribution"
              className="rounded text-[10px] text-white-50 underline shadow-brand-500 drop-shadow-[2px_2px_2px_var(--tw-shadow-color)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-green"
            >
              Data attribution
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="end"
            sideOffset={8}
            className="max-w-xs border border-secondary-500 bg-secondary-500 text-[11px] leading-snug text-brand-500 [&_a]:rounded [&_a]:underline [&_a]:focus:outline-none [&_a]:focus-visible:ring-2 [&_a]:focus-visible:ring-accent-green"
          >
            <ul className="space-y-1">
              {rendered.map(({ html, node }) => (
                <li key={html}>{node}</li>
              ))}
            </ul>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
