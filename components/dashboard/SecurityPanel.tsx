'use client';

import { useEffect, useRef, useState } from 'react';
import { CircleCheck, RefreshCw, TriangleAlert } from 'lucide-react';

type SecurityStatus = 'passed' | 'warning';

type SecurityCheck = {
  label: string;
  status: SecurityStatus;
  detail: string;
};

const SECURITY_CHECKS: SecurityCheck[] = [
  { label: 'TLS 1.3 encryption', status: 'passed', detail: 'Enforced on all routes' },
  { label: 'DDoS mitigation', status: 'passed', detail: 'Auto-scaling WAF active' },
  { label: '2FA enforcement', status: 'passed', detail: '100% of members' },
  { label: 'Secrets rotation', status: 'passed', detail: 'Rotated 6 days ago' },
  { label: 'Dependency audit', status: 'warning', detail: '2 low-severity advisories' },
  { label: 'Audit logging', status: 'passed', detail: 'Streaming to SIEM' },
];

type Stat = {
  label: string;
  value: string;
};

const STATS: Stat[] = [
  { label: 'Checks passed', value: '5 / 6' },
  { label: 'Open advisories', value: '2' },
  { label: 'Last incident', value: '46d ago' },
];

type ScanStatus = 'idle' | 'scanning';

export function SecurityPanel() {
  const [scanStatus, setScanStatus] = useState<ScanStatus>('idle');
  const [lastScan, setLastScan] = useState<string>('4h ago');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    },
    [],
  );

  const handleScan = (): void => {
    if (scanStatus === 'scanning') {
      return;
    }
    setScanStatus('scanning');
    timer.current = setTimeout(() => {
      setScanStatus('idle');
      setLastScan('just now');
    }, 2200);
  };

  const score = 98;
  const circumference = 2 * Math.PI * 16;
  const filled = (score / 100) * circumference;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 lg:col-span-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-zinc-300">Security score</h3>
          <button
            type="button"
            onClick={handleScan}
            disabled={scanStatus === 'scanning'}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-200 transition-colors hover:bg-white/10 active:scale-95 disabled:opacity-70"
          >
            <RefreshCw className={`h-3 w-3 ${scanStatus === 'scanning' ? 'animate-spin' : ''}`} />
            {scanStatus === 'scanning' ? 'Scanning…' : 'Re-run'}
          </button>
        </div>

        <div className="mt-4 flex flex-col items-center justify-center py-2">
          <div className="relative flex h-32 w-32 items-center justify-center">
            <svg viewBox="0 0 36 36" className="h-32 w-32 -rotate-90">
              <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="rgb(52 211 153)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={`${filled} ${circumference}`}
              />
            </svg>
            <div className="absolute text-center">
              <span className="block text-3xl font-semibold text-white">{score}</span>
              <span className="block text-[10px] uppercase tracking-wide text-emerald-400">Excellent</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-500">Last scanned {lastScan}</p>
        </div>

        <dl className="mt-2 grid grid-cols-3 gap-2">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.02] p-2 text-center">
              <dd className="text-sm font-semibold text-white">{stat.value}</dd>
              <dt className="mt-0.5 text-[10px] leading-tight text-zinc-500">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 lg:col-span-2">
        <h3 className="text-sm font-medium text-zinc-300">Posture checks</h3>
        <ul className="mt-4 space-y-2">
          {SECURITY_CHECKS.map((check) => (
            <li
              key={check.label}
              className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5 transition-colors hover:border-white/15"
            >
              {check.status === 'passed' ? (
                <CircleCheck className="h-4 w-4 shrink-0 text-emerald-400" />
              ) : (
                <TriangleAlert className="h-4 w-4 shrink-0 text-amber-400" />
              )}
              <span className="flex-1 text-sm font-medium text-zinc-200">{check.label}</span>
              <span className="hidden text-xs text-zinc-500 sm:inline">{check.detail}</span>
              <span
                className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ring-1 ${
                  check.status === 'passed'
                    ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 ring-amber-500/20'
                }`}
              >
                {check.status === 'passed' ? 'Pass' : 'Warn'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
