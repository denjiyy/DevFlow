'use client';

import { useEffect, useState } from 'react';
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CircleCheck,
  ScrollText,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type TabId = 'analytics' | 'logs' | 'security';

type Tab = {
  id: TabId;
  label: string;
  icon: LucideIcon;
};

const TABS: Tab[] = [
  { id: 'analytics', label: 'Analytics', icon: Activity },
  { id: 'logs', label: 'Logs', icon: ScrollText },
  { id: 'security', label: 'Security', icon: ShieldCheck },
];

type Trend = 'up' | 'down';

type Metric = {
  label: string;
  value: string;
  delta: string;
  trend: Trend;
};

const INITIAL_BARS: number[] = [46, 58, 52, 64, 60, 72, 66, 78, 71, 82, 76, 88];

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

type LogEntry = {
  id: number;
  time: string;
  level: LogLevel;
  method: string;
  path: string;
  status: number;
  ms: number;
};

type LogTemplate = Omit<LogEntry, 'id' | 'time' | 'ms'>;

const LOG_POOL: LogTemplate[] = [
  { level: 'info', method: 'GET', path: '/api/users', status: 200 },
  { level: 'info', method: 'POST', path: '/api/checkout', status: 201 },
  { level: 'debug', method: 'GET', path: '/api/cache/hit', status: 304 },
  { level: 'warn', method: 'GET', path: '/api/search', status: 429 },
  { level: 'info', method: 'GET', path: '/api/products', status: 200 },
  { level: 'error', method: 'POST', path: '/api/webhooks/stripe', status: 500 },
  { level: 'info', method: 'PATCH', path: '/api/settings', status: 200 },
  { level: 'debug', method: 'GET', path: '/api/flags', status: 200 },
];

const INITIAL_LOGS: LogEntry[] = [
  { id: 1, time: '12:04:57', level: 'info', method: 'GET', path: '/api/users', status: 200, ms: 14 },
  { id: 2, time: '12:04:58', level: 'debug', method: 'GET', path: '/api/cache/hit', status: 304, ms: 3 },
  { id: 3, time: '12:04:58', level: 'warn', method: 'GET', path: '/api/search', status: 429, ms: 61 },
  { id: 4, time: '12:04:59', level: 'info', method: 'POST', path: '/api/checkout', status: 201, ms: 42 },
];

const LEVEL_STYLES: Record<LogLevel, string> = {
  info: 'bg-sky-500/10 text-sky-300 ring-sky-500/20',
  warn: 'bg-amber-500/10 text-amber-300 ring-amber-500/20',
  error: 'bg-red-500/10 text-red-300 ring-red-500/20',
  debug: 'bg-zinc-500/10 text-zinc-300 ring-zinc-500/20',
};

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
  { label: 'Dependency audit', status: 'warning', detail: '2 low-severity advisories' },
  { label: 'Audit logging', status: 'passed', detail: 'Streaming to SIEM' },
];

function formatClock(date: Date): string {
  return [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((unit) => String(unit).padStart(2, '0'))
    .join(':');
}

type SelectHandler = (key: string) => void;

type DashboardShowcaseProps = {
  className?: string;
};

export function DashboardShowcase({ className = '' }: DashboardShowcaseProps) {
  const [activeTab, setActiveTab] = useState<TabId>('analytics');
  const [bars, setBars] = useState<number[]>(INITIAL_BARS);
  const [requests, setRequests] = useState<number>(1284);
  const [latency, setLatency] = useState<number>(48);
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  useEffect(() => {
    let counter = INITIAL_LOGS.length;

    const intervalId = setInterval(() => {
      setBars((previous) => {
        const next = previous.slice(1);
        const last = previous[previous.length - 1];
        const delta = (Math.random() - 0.45) * 20;
        next.push(Math.max(35, Math.min(100, last + delta)));
        return next;
      });

      setRequests((previous) =>
        Math.max(900, previous + Math.round((Math.random() - 0.4) * 90)),
      );
      setLatency(40 + Math.round(Math.random() * 22));

      counter += 1;
      const template = LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)];
      const entry: LogEntry = {
        ...template,
        id: counter,
        time: formatClock(new Date()),
        ms: 3 + Math.floor(Math.random() * 80),
      };
      setLogs((previous) => [entry, ...previous].slice(0, 6));
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSelect: SelectHandler = (key) =>
    setSelectedKey((previous) => (previous === key ? null : key));

  const metrics: Metric[] = [
    { label: 'Requests / min', value: requests.toLocaleString('en-US'), delta: '+12.4%', trend: 'up' },
    { label: 'Avg latency', value: `${latency}ms`, delta: '-8.1%', trend: 'down' },
    { label: 'Error rate', value: '0.02%', delta: '-0.4%', trend: 'down' },
  ];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(600px circle at 30% 0%, rgba(139, 92, 246, 0.10), transparent 60%)',
        }}
      />
      <div className="relative flex h-full flex-col">
        <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-white">Production Dashboard</h3>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Live
              </span>
            </div>
            <p className="mt-0.5 text-xs text-zinc-500">acme-corp · us-east-1</p>
          </div>

          <div
            role="tablist"
            aria-label="Dashboard views"
            className="flex items-center gap-1 rounded-xl border border-white/10 bg-black/30 p-1"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-glow-sm'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 p-4 sm:p-5">
          {activeTab === 'analytics' ? (
            <AnalyticsView
              metrics={metrics}
              bars={bars}
              selectedKey={selectedKey}
              onSelect={handleSelect}
            />
          ) : null}
          {activeTab === 'logs' ? (
            <LogsView logs={logs} selectedKey={selectedKey} onSelect={handleSelect} />
          ) : null}
          {activeTab === 'security' ? (
            <SecurityView selectedKey={selectedKey} onSelect={handleSelect} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

type AnalyticsViewProps = {
  metrics: Metric[];
  bars: number[];
  selectedKey: string | null;
  onSelect: SelectHandler;
};

function AnalyticsView({ metrics, bars, selectedKey, onSelect }: AnalyticsViewProps) {
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-3 gap-3">
        {metrics.map((metric) => {
          const key = `metric:${metric.label}`;
          const isSelected = selectedKey === key;
          return (
            <button
              key={metric.label}
              type="button"
              onClick={() => onSelect(key)}
              className={`rounded-xl border bg-white/[0.02] p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 active:scale-[0.98] ${
                isSelected
                  ? 'border-violet-500/60 bg-violet-500/5'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <p className="truncate text-[11px] text-zinc-500">{metric.label}</p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-white sm:text-xl">
                {metric.value}
              </p>
              <p className="mt-0.5 inline-flex items-center gap-0.5 text-[11px] text-emerald-400">
                {metric.trend === 'up' ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {metric.delta}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium text-zinc-300">Requests over time</p>
          <p className="text-[11px] text-zinc-500">last 60 min</p>
        </div>
        <div className="flex h-28 items-end gap-1.5">
          {bars.map((value, index) => (
            <div
              key={index}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-violet-600/50 to-fuchsia-400/90 transition-[height] duration-500 ease-out"
              style={{ height: `${value}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type LogsViewProps = {
  logs: LogEntry[];
  selectedKey: string | null;
  onSelect: SelectHandler;
};

function statusColor(status: number): string {
  if (status >= 500) {
    return 'text-red-400';
  }
  if (status >= 400) {
    return 'text-amber-400';
  }
  return 'text-emerald-400';
}

function LogsView({ logs, selectedKey, onSelect }: LogsViewProps) {
  return (
    <div className="animate-fade-in space-y-1 font-mono text-xs">
      {logs.map((log) => {
        const key = `log:${log.id}`;
        const isSelected = selectedKey === key;
        return (
          <button
            key={log.id}
            type="button"
            onClick={() => onSelect(key)}
            className={`flex w-full animate-fade-up items-center gap-2 rounded-lg border bg-white/[0.02] px-2.5 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 ${
              isSelected ? 'border-violet-500/50 bg-violet-500/5' : 'border-white/5 hover:border-white/15'
            }`}
          >
            <span className="hidden text-zinc-600 sm:inline">{log.time}</span>
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ring-1 ${LEVEL_STYLES[log.level]}`}
            >
              {log.level}
            </span>
            <span className="font-semibold text-zinc-300">{log.method}</span>
            <span className="flex-1 truncate text-zinc-400">{log.path}</span>
            <span className={statusColor(log.status)}>{log.status}</span>
            <span className="hidden text-zinc-600 sm:inline">{log.ms}ms</span>
          </button>
        );
      })}
    </div>
  );
}

type SecurityViewProps = {
  selectedKey: string | null;
  onSelect: SelectHandler;
};

function SecurityView({ selectedKey, onSelect }: SecurityViewProps) {
  const circumference = 2 * Math.PI * 16;
  const score = 98;
  const filled = (score / 100) * circumference;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-transparent p-4">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="rgb(52 211 153)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${filled} ${circumference}`}
            />
          </svg>
          <span className="absolute text-sm font-semibold text-white">{score}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Security score</p>
          <p className="mt-0.5 text-xs text-zinc-400">Excellent — 4 of 5 checks passing</p>
        </div>
      </div>

      <ul className="mt-3 space-y-1.5">
        {SECURITY_CHECKS.map((check) => {
          const key = `sec:${check.label}`;
          const isSelected = selectedKey === key;
          return (
            <li key={check.label}>
              <button
                type="button"
                onClick={() => onSelect(key)}
                className={`flex w-full items-center gap-3 rounded-lg border bg-white/[0.02] px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 ${
                  isSelected ? 'border-violet-500/50 bg-violet-500/5' : 'border-white/5 hover:border-white/15'
                }`}
              >
                {check.status === 'passed' ? (
                  <CircleCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                ) : (
                  <TriangleAlert className="h-4 w-4 shrink-0 text-amber-400" />
                )}
                <span className="flex-1 text-xs font-medium text-zinc-200">{check.label}</span>
                <span className="text-[11px] text-zinc-500">{check.detail}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
