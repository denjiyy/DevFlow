'use client';

import { useEffect, useState } from 'react';

const POINT_COUNT = 16;
const INITIAL_DATA: number[] = [
  40, 44, 38, 50, 46, 58, 52, 63, 55, 66, 60, 70, 64, 72, 68, 76,
];

export function MiniChart() {
  const [data, setData] = useState<number[]>(INITIAL_DATA);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData((previous) => {
        const next = previous.slice(1);
        const last = previous[previous.length - 1];
        const delta = (Math.random() - 0.5) * 20;
        const value = Math.max(24, Math.min(92, last + delta));
        next.push(value);
        return next;
      });
    }, 1500);

    return () => clearInterval(intervalId);
  }, []);

  const width = 100;
  const height = 40;
  const step = width / (POINT_COUNT - 1);

  const linePoints = data
    .map((value, index) => `${index * step},${height - (value / 100) * height}`)
    .join(' ');
  const areaPoints = `0,${height} ${linePoints} ${width},${height}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="h-16 w-full"
      role="img"
      aria-label="Live latency sparkline"
    >
      <defs>
        <linearGradient id="mini-chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(34 211 238)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="rgb(34 211 238)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mini-chart-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill="url(#mini-chart-fill)" />
      <polyline
        points={linePoints}
        fill="none"
        stroke="url(#mini-chart-line)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
