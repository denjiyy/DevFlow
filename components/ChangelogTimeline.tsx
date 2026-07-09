'use client';

import { useState } from 'react';

export type ChangeType = 'feature' | 'improvement' | 'fix';

export type Change = {
  type: ChangeType;
  text: string;
};

export type Release = {
  version: string;
  date: string;
  title: string;
  tag: string;
  changes: Change[];
};

type Filter = 'all' | ChangeType;

type FilterTab = {
  label: string;
  value: Filter;
};

const FILTER_TABS: FilterTab[] = [
  { label: 'All', value: 'all' },
  { label: 'Features', value: 'feature' },
  { label: 'Improvements', value: 'improvement' },
  { label: 'Fixes', value: 'fix' },
];

const TYPE_STYLES: Record<ChangeType, string> = {
  feature: 'bg-violet-500/10 text-violet-300 ring-violet-500/20',
  improvement: 'bg-cyan-500/10 text-cyan-300 ring-cyan-500/20',
  fix: 'bg-amber-500/10 text-amber-300 ring-amber-500/20',
};

const TYPE_LABEL: Record<ChangeType, string> = {
  feature: 'Feature',
  improvement: 'Improvement',
  fix: 'Fix',
};

type ChangelogTimelineProps = {
  releases: Release[];
};

export function ChangelogTimeline({ releases }: ChangelogTimelineProps) {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = releases
    .map((release) => ({
      ...release,
      changes:
        filter === 'all'
          ? release.changes
          : release.changes.filter((change) => change.type === filter),
    }))
    .filter((release) => release.changes.length > 0);

  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {FILTER_TABS.map((tab) => {
          const isActive = filter === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setFilter(tab.value)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 ${
                isActive
                  ? 'bg-white/10 text-white ring-1 ring-inset ring-white/15'
                  : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-zinc-500">Nothing matching that filter yet.</p>
      ) : (
        <div className="mt-10 border-l border-white/10 pl-8">
          <div className="space-y-12">
            {filtered.map((release) => (
              <article key={release.version} className="relative">
                <span className="absolute -left-10 top-1 h-4 w-4 rounded-full border-2 border-violet-500 bg-[#060608]" />
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-xs font-medium text-white">
                    {release.version}
                  </span>
                  <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-300 ring-1 ring-inset ring-violet-500/20">
                    {release.tag}
                  </span>
                  <time className="text-xs text-zinc-500">{release.date}</time>
                </div>
                <h2 className="mt-2 text-lg font-semibold text-white">{release.title}</h2>
                <ul className="mt-3 space-y-2">
                  {release.changes.map((change, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-sm text-zinc-400">
                      <span
                        className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ring-1 ${TYPE_STYLES[change.type]}`}
                      >
                        {TYPE_LABEL[change.type]}
                      </span>
                      <span className="leading-relaxed">{change.text}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
