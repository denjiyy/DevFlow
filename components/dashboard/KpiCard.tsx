'use client';

import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type KpiConfig = {
  icon: LucideIcon;
  label: string;
  format: (value: number) => string;
  trend: string;
  positive: boolean;
  accent: string;
  seed: number[];
  volatility: number;
  min: number;
  max: number;
};

export function KpiCard({
  icon: Icon,
  label,
  format,
  trend,
  positive,
  accent,
  seed,
  volatility,
  min,
  max,
}: KpiConfig) {
  const [data, setData] = useState<number[]>(seed);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData((previous) => {
        const next = previous.slice(1);
        const last = previous[previous.length - 1];
        const delta = (Math.random() - 0.5) * volatility;
        next.push(Math.max(min, Math.min(max, last + delta)));
        return next;
      });
    }, 1800);

    return () => clearInterval(intervalId);
  }, [volatility, min, max]);

  const value = data[data.length - 1];
  const gradientId = `kpi-${label.replace(/[^a-z0-9]/gi, '').toLowerCase()}`;

  const width = 100;
  const height = 32;
  const lo = Math.min(...data);
  const hi = Math.max(...data);
  const range = hi - lo || 1;
  const step = width / (data.length - 1);
  const linePoints = data
    .map((point, index) => `${index * step},${height - ((point - lo) / range) * height}`)
    .join(' ');
  const areaPoints = `0,${height} ${linePoints} ${width},${height}`;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/20">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300">
          <Icon className="h-4 w-4" />
        </span>
        <span
          className={`inline-flex items-center gap-0.5 text-xs font-medium ${
            positive ? 'text-emerald-400' : 'text-red-400'
          }`}
        >
          {trend.startsWith('-') ? (
            <ArrowDownRight className="h-3 w-3" />
          ) : (
            <ArrowUpRight className="h-3 w-3" />
          )}
          {trend}
        </span>
      </div>

      <p className="mt-4 text-xs text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums text-white">{format(value)}</p>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="mt-3 h-9 w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill={`url(#${gradientId})`} />
        <polyline
          points={linePoints}
          fill="none"
          stroke={accent}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
