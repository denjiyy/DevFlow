'use client';

import { useEffect, useRef, useState } from 'react';
import { GitBranch, Plus, RefreshCw } from 'lucide-react';

type DeployState = 'ready' | 'building' | 'error' | 'queued';

type Deployment = {
  id: string;
  hash: string;
  message: string;
  branch: string;
  env: string;
  duration: string;
  time: string;
  state: DeployState;
};

const INITIAL_DEPLOYMENTS: Deployment[] = [
  { id: 'dpl_1', hash: 'a1f92c4', message: 'feat: streaming edge functions', branch: 'main', env: 'Production', duration: '42s', time: '2m ago', state: 'ready' },
  { id: 'dpl_2', hash: '7b3e0da', message: 'fix: retry logic on cold starts', branch: 'main', env: 'Production', duration: '38s', time: '18m ago', state: 'ready' },
  { id: 'dpl_3', hash: 'c9d14f8', message: 'chore: bump edge runtime to v3', branch: 'release/3.0', env: 'Preview', duration: '—', time: 'just now', state: 'building' },
  { id: 'dpl_4', hash: '2e88a10', message: 'feat: per-region rate limits', branch: 'feat/limits', env: 'Preview', duration: '51s', time: '1h ago', state: 'ready' },
  { id: 'dpl_5', hash: 'f40b7c2', message: 'refactor: config loader', branch: 'feat/config', env: 'Preview', duration: '12s', time: '3h ago', state: 'error' },
  { id: 'dpl_6', hash: '5aa9e31', message: 'docs: update CLI reference', branch: 'docs/cli', env: 'Preview', duration: '—', time: '3h ago', state: 'queued' },
];

const STATE_STYLES: Record<DeployState, { dot: string; text: string; label: string }> = {
  ready: { dot: 'bg-emerald-400', text: 'text-emerald-400', label: 'Ready' },
  building: { dot: 'bg-amber-400 animate-pulse', text: 'text-amber-400', label: 'Building' },
  error: { dot: 'bg-red-400', text: 'text-red-400', label: 'Error' },
  queued: { dot: 'bg-zinc-400', text: 'text-zinc-400', label: 'Queued' },
};

export function DeploymentsTable() {
  const [deployments, setDeployments] = useState<Deployment[]>(INITIAL_DEPLOYMENTS);
  const [redeployingId, setRedeployingId] = useState<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const counter = useRef<number>(0);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  const handleNewDeployment = (): void => {
    counter.current += 1;
    const id = `dpl_new_${counter.current}`;
    const hash = Math.random().toString(16).slice(2, 9);
    const entry: Deployment = {
      id,
      hash,
      message: 'chore: manual deploy from dashboard',
      branch: 'main',
      env: 'Production',
      duration: '—',
      time: 'just now',
      state: 'building',
    };
    setDeployments((previous) => [entry, ...previous].slice(0, 8));
    timers.current.push(
      setTimeout(() => {
        setDeployments((previous) =>
          previous.map((deployment) =>
            deployment.id === id
              ? { ...deployment, state: 'ready', duration: `${20 + Math.floor(Math.random() * 30)}s` }
              : deployment,
          ),
        );
      }, 2600),
    );
  };

  const handleRedeploy = (id: string): void => {
    setRedeployingId(id);
    timers.current.push(setTimeout(() => setRedeployingId(null), 1800));
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <h3 className="text-sm font-medium text-zinc-300">Recent deployments</h3>
        <button
          type="button"
          onClick={handleNewDeployment}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-white/10 active:scale-95"
        >
          <Plus className="h-3.5 w-3.5" />
          New deployment
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="text-left text-xs text-zinc-500">
              <th className="px-5 py-3 font-medium">Deployment</th>
              <th className="px-5 py-3 font-medium">Branch</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Duration</th>
              <th className="px-5 py-3 font-medium">When</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {deployments.map((deployment) => {
              const style = STATE_STYLES[deployment.state];
              const isRedeploying = redeployingId === deployment.id;
              return (
                <tr key={deployment.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className={`h-2 w-2 shrink-0 rounded-full ${style.dot}`} />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-zinc-200">{deployment.message}</p>
                        <p className="truncate font-mono text-xs text-zinc-500">
                          {deployment.hash} · {deployment.env}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1.5 text-zinc-400">
                      <GitBranch className="h-3.5 w-3.5 text-zinc-500" />
                      {deployment.branch}
                    </span>
                  </td>
                  <td className={`px-5 py-3 font-medium ${style.text}`}>{style.label}</td>
                  <td className="px-5 py-3 tabular-nums text-zinc-400">{deployment.duration}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-zinc-500">{deployment.time}</td>
                  <td className="px-5 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleRedeploy(deployment.id)}
                      disabled={isRedeploying}
                      aria-label={`Redeploy ${deployment.message}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:border-white/20 hover:text-white active:scale-95 disabled:opacity-70"
                    >
                      <RefreshCw className={`h-3.5 w-3.5 ${isRedeploying ? 'animate-spin' : ''}`} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
