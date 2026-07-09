import type { Metadata } from 'next';
import { ChangelogTimeline } from '@/components/ChangelogTimeline';
import type { Release } from '@/components/ChangelogTimeline';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'New features, improvements, and fixes shipping across the DevFlow platform.',
};

const RELEASES: Release[] = [
  {
    version: 'v2.0.0',
    date: 'July 1, 2026',
    tag: 'major',
    title: 'Edge functions and the new dashboard',
    changes: [
      { type: 'feature', text: 'Edge functions now run in 320+ locations with sub-millisecond cold starts.' },
      { type: 'feature', text: 'A completely rebuilt dashboard with live analytics, logs, and security posture.' },
      { type: 'improvement', text: 'Build times are up to 40% faster thanks to a new caching layer.' },
      { type: 'fix', text: 'Resolved a race condition when promoting concurrent production deploys.' },
    ],
  },
  {
    version: 'v1.9.0',
    date: 'June 12, 2026',
    tag: 'minor',
    title: 'Per-region rate limits',
    changes: [
      { type: 'feature', text: 'Configure rate limits per region directly from devflow.json.' },
      { type: 'improvement', text: 'Log streaming now reconnects automatically after network drops.' },
      { type: 'fix', text: 'Fixed incorrect p99 latency reporting on the overview page.' },
    ],
  },
  {
    version: 'v1.8.2',
    date: 'May 28, 2026',
    tag: 'patch',
    title: 'Stability and CLI polish',
    changes: [
      { type: 'improvement', text: 'The CLI now prints a shareable preview URL immediately after upload.' },
      { type: 'fix', text: 'devflow rollback no longer prompts twice on protected branches.' },
      { type: 'fix', text: 'Corrected a rare 500 when webhooks fired during a rollback window.' },
    ],
  },
  {
    version: 'v1.8.0',
    date: 'May 9, 2026',
    tag: 'minor',
    title: 'Preview deployments for every PR',
    changes: [
      { type: 'feature', text: 'Every pull request now gets an isolated preview environment with seeded data.' },
      { type: 'improvement', text: 'Deployment history is now searchable by commit, branch, and author.' },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-2">
        <p className="text-sm font-medium text-violet-400">Changelog</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          What’s new in DevFlow
        </h1>
        <p className="mt-3 text-pretty text-zinc-400">
          A running log of features, improvements, and fixes shipping across the
          platform. Filter by the kind of change you care about.
        </p>
      </header>

      <div className="mt-10">
        <ChangelogTimeline releases={RELEASES} />
      </div>
    </main>
  );
}
