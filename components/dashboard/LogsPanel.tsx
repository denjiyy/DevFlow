'use client';

import { useEffect, useRef, useState } from 'react';

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
  { level: 'warn', method: 'DELETE', path: '/api/sessions', status: 409 },
  { level: 'error', method: 'GET', path: '/api/reports/export', status: 503 },
];

const INITIAL_LOGS: LogEntry[] = [
  { id: 1, time: '12:04:52', level: 'info', method: 'GET', path: '/api/users', status: 200, ms: 14 },
  { id: 2, time: '12:04:53', level: 'debug', method: 'GET', path: '/api/cache/hit', status: 304, ms: 3 },
  { id: 3, time: '12:04:55', level: 'warn', method: 'GET', path: '/api/search', status: 429, ms: 61 },
  { id: 4, time: '12:04:56', level: 'info', method: 'POST', path: '/api/checkout', status: 201, ms: 42 },
  { id: 5, time: '12:04:58', level: 'error', method: 'POST', path: '/api/webhooks/stripe', status: 500, ms: 88 },
];

const LEVEL_STYLES: Record<LogLevel, string> = {
  info: 'bg-sky-500/10 text-sky-300 ring-sky-500/20',
  warn: 'bg-amber-500/10 text-amber-300 ring-amber-500/20',
  error: 'bg-red-500/10 text-red-300 ring-red-500/20',
  debug: 'bg-zinc-500/10 text-zinc-300 ring-zinc-500/20',
};

type Filter = 'all' | LogLevel;

const FILTERS: Filter[] = ['all', 'info', 'warn', 'error', 'debug'];

function formatClock(date: Date): string {
  return [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((unit) => String(unit).padStart(2, '0'))
    .join(':');
}

function statusColor(status: number): string {
  if (status >= 500) {
    return 'text-red-400';
  }
  if (status >= 400) {
    return 'text-amber-400';
  }
  return 'text-emerald-400';
}

export function LogsPanel() {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [filter, setFilter] = useState<Filter>('all');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const counter = useRef<number>(INITIAL_LOGS.length);

  useEffect(() => {
    if (isPaused) {
      return;
    }
    const intervalId = setInterval(() => {
      counter.current += 1;
      const template = LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)];
      const entry: LogEntry = {
        ...template,
        id: counter.current,
        time: formatClock(new Date()),
        ms: 3 + Math.floor(Math.random() * 90),
      };
      setLogs((previous) => [entry, ...previous].slice(0, 40));
    }, 1400);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  const visible = (filter === 'all' ? logs : logs.filter((log) => log.level === filter)).slice(0, 14);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {FILTERS.map((option) => {
            const isActive = filter === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 ${
                  isActive
                    ? 'bg-white/10 text-white ring-1 ring-inset ring-white/15'
                    : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setIsPaused((previous) => !previous)}
          className="inline-flex items-center gap-1.5 self-start rounded-md border border-white/10 px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/5 active:scale-95 sm:self-auto"
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isPaused ? 'bg-zinc-500' : 'animate-pulse bg-emerald-400'
            }`}
          />
          {isPaused ? 'Paused' : 'Live'}
        </button>
      </div>

      <div className="h-80 overflow-y-auto p-2 font-mono text-xs">
        {visible.length === 0 ? (
          <p className="px-2 py-6 text-center text-zinc-600">No {filter} logs in the buffer.</p>
        ) : (
          <ul className="space-y-0.5">
            {visible.map((log) => (
              <li
                key={log.id}
                className="flex animate-fade-up items-center gap-2 rounded px-2 py-1.5 hover:bg-white/[0.03]"
              >
                <span className="hidden shrink-0 text-zinc-600 sm:inline">{log.time}</span>
                <span
                  className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ring-1 ${LEVEL_STYLES[log.level]}`}
                >
                  {log.level}
                </span>
                <span className="shrink-0 font-semibold text-zinc-300">{log.method}</span>
                <span className="flex-1 truncate text-zinc-400">{log.path}</span>
                <span className={`shrink-0 ${statusColor(log.status)}`}>{log.status}</span>
                <span className="hidden shrink-0 text-zinc-600 sm:inline">{log.ms}ms</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
