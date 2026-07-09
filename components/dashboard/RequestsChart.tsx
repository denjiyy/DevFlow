'use client';

import { useEffect, useState } from 'react';

const POINT_COUNT = 24;
const MAX_Y = 150;

const INITIAL: number[] = [
  62, 70, 66, 78, 74, 85, 80, 92, 88, 98, 94, 104, 99, 110, 106, 116, 112, 120,
  116, 126, 121, 130, 126, 134,
];

const GRID_VALUES = [0, 50, 100, 150];

const PLOT_LEFT = 44;
const PLOT_RIGHT = 708;
const PLOT_TOP = 14;
const PLOT_BOTTOM = 232;

export function RequestsChart() {
  const [data, setData] = useState<number[]>(INITIAL);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData((previous) => {
        const next = previous.slice(1);
        const last = previous[previous.length - 1];
        const delta = (Math.random() - 0.45) * 26;
        next.push(Math.max(30, Math.min(MAX_Y, last + delta)));
        return next;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const plotWidth = PLOT_RIGHT - PLOT_LEFT;
  const plotHeight = PLOT_BOTTOM - PLOT_TOP;
  const toX = (index: number): number =>
    PLOT_LEFT + (index / (POINT_COUNT - 1)) * plotWidth;
  const toY = (value: number): number => PLOT_BOTTOM - (value / MAX_Y) * plotHeight;

  const linePoints = data.map((value, index) => `${toX(index)},${toY(value)}`).join(' ');
  const areaPoints = `${PLOT_LEFT},${PLOT_BOTTOM} ${linePoints} ${PLOT_RIGHT},${PLOT_BOTTOM}`;
  const latest = data[data.length - 1];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-zinc-300">Requests</h3>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live
            </span>
          </div>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-white">
            {latest.toFixed(1)}k
            <span className="ml-1 text-sm font-normal text-zinc-500">req / min</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span className="h-2 w-4 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
          this hour
        </div>
      </div>

      <svg viewBox="0 0 720 256" className="mt-4 h-auto w-full" role="img" aria-label="Requests over the last hour">
        <defs>
          <linearGradient id="requests-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="requests-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        {GRID_VALUES.map((gridValue) => (
          <g key={gridValue}>
            <line
              x1={PLOT_LEFT}
              y1={toY(gridValue)}
              x2={PLOT_RIGHT}
              y2={toY(gridValue)}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
            />
            <text x={PLOT_LEFT - 10} y={toY(gridValue) + 4} textAnchor="end" fontSize="11" fill="#71717a">
              {gridValue === 0 ? '0' : `${gridValue}k`}
            </text>
          </g>
        ))}

        <polygon points={areaPoints} fill="url(#requests-area)" style={{ transition: 'all 0.6s ease' }} />
        <polyline
          points={linePoints}
          fill="none"
          stroke="url(#requests-line)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: 'all 0.6s ease' }}
        />
        <circle cx={toX(POINT_COUNT - 1)} cy={toY(latest)} r="4" fill="#22d3ee" />
        <circle cx={toX(POINT_COUNT - 1)} cy={toY(latest)} r="8" fill="#22d3ee" opacity="0.25" />

        {['-60m', '-30m', 'now'].map((label, index) => {
          const positionIndex = index === 0 ? 0 : index === 1 ? 11 : POINT_COUNT - 1;
          const anchor = index === 0 ? 'start' : index === 2 ? 'end' : 'middle';
          return (
            <text
              key={label}
              x={toX(positionIndex)}
              y={PLOT_BOTTOM + 20}
              textAnchor={anchor}
              fontSize="11"
              fill="#71717a"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
