'use client';

import { Activity, Gauge, Timer, TriangleAlert } from 'lucide-react';
import { KpiCard } from '@/components/dashboard/KpiCard';
import type { KpiConfig } from '@/components/dashboard/KpiCard';
import { RequestsChart } from '@/components/dashboard/RequestsChart';
import { RegionBars } from '@/components/dashboard/RegionBars';
import { DeploymentsTable } from '@/components/dashboard/DeploymentsTable';
import { LogsPanel } from '@/components/dashboard/LogsPanel';
import { SecurityPanel } from '@/components/dashboard/SecurityPanel';

const KPIS: KpiConfig[] = [
  {
    icon: Activity,
    label: 'Requests / min',
    format: (value) => Math.round(value).toLocaleString('en-US'),
    trend: '+12.4%',
    positive: true,
    accent: '#a78bfa',
    seed: [12200, 12600, 12400, 12900, 12700, 13200, 13000, 13400, 13100, 13500, 13300, 13650],
    volatility: 220,
    min: 11000,
    max: 15000,
  },
  {
    icon: Timer,
    label: 'Avg latency',
    format: (value) => `${Math.round(value)}ms`,
    trend: '-8.1%',
    positive: true,
    accent: '#22d3ee',
    seed: [44, 48, 46, 50, 47, 52, 49, 54, 50, 55, 51, 56],
    volatility: 6,
    min: 38,
    max: 66,
  },
  {
    icon: TriangleAlert,
    label: 'Error rate',
    format: (value) => `${value.toFixed(2)}%`,
    trend: '-0.4%',
    positive: true,
    accent: '#34d399',
    seed: [0.02, 0.03, 0.025, 0.04, 0.03, 0.05, 0.035, 0.045, 0.03, 0.04, 0.05, 0.035],
    volatility: 0.03,
    min: 0.01,
    max: 0.2,
  },
  {
    icon: Gauge,
    label: 'Throughput',
    format: (value) => `${Math.round(value)}/s`,
    trend: '+3.1%',
    positive: true,
    accent: '#e879f9',
    seed: [1020, 1080, 1050, 1120, 1100, 1160, 1140, 1190, 1170, 1210, 1190, 1240],
    volatility: 40,
    min: 820,
    max: 1400,
  },
];

type SectionHeadingProps = {
  title: string;
  subtitle: string;
};

function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-0.5 text-sm text-zinc-500">{subtitle}</p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-10 pb-10">
      <div>
        <h1 className="text-xl font-semibold text-white">Production overview</h1>
        <p className="mt-1 text-sm text-zinc-500">
          A live snapshot of acme-corp · us-east-1
        </p>
      </div>

      <section id="overview" className="scroll-mt-24">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KPIS.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </div>
      </section>

      <section id="analytics" className="scroll-mt-24">
        <SectionHeading title="Analytics" subtitle="Traffic and performance across regions" />
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RequestsChart />
          </div>
          <div className="lg:col-span-1">
            <RegionBars />
          </div>
        </div>
      </section>

      <section id="deployments" className="scroll-mt-24">
        <SectionHeading title="Deployments" subtitle="Latest builds and their status" />
        <div className="mt-4">
          <DeploymentsTable />
        </div>
      </section>

      <section id="logs" className="scroll-mt-24">
        <SectionHeading title="Logs" subtitle="Live request logs streaming from the edge" />
        <div className="mt-4">
          <LogsPanel />
        </div>
      </section>

      <section id="security" className="scroll-mt-24">
        <SectionHeading title="Security" subtitle="Posture and compliance checks" />
        <div className="mt-4">
          <SecurityPanel />
        </div>
      </section>
    </div>
  );
}
