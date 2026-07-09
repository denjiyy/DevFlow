import Link from 'next/link';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { GlowButton } from '@/components/GlowButton';
import { LiveTerminal } from '@/components/LiveTerminal';

type Stat = {
  value: string;
  label: string;
};

const STATS: Stat[] = [
  { value: '12M+', label: 'Deployments shipped' },
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '48ms', label: 'p99 latency' },
  { value: '2,400+', label: 'Teams onboard' },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <Link
          href="/changelog"
          className="group mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300 backdrop-blur transition-colors hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-violet-500/20">
            <Sparkles className="h-2.5 w-2.5 text-violet-300" />
          </span>
          <span>Introducing DevFlow 2.0 — now with edge functions</span>
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Ship faster with the{' '}
          <span className="text-gradient-brand">modern developer</span> platform
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-zinc-400 sm:text-lg">
          Deploy, monitor, and scale your applications with zero configuration.
          Built for developers who’d rather ship than configure.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <GlowButton href="/dashboard" icon={ArrowRight}>
            Start building
          </GlowButton>
          <GlowButton href="/docs" variant="secondary" icon={BookOpen}>
            Read the docs
          </GlowButton>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-3xl">
        <LiveTerminal />
      </div>

      <ul className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] sm:grid-cols-4">
        {STATS.map((stat) => (
          <li key={stat.label} className="bg-[#060608]">
            <a
              href="#features"
              className="flex flex-col items-center gap-1 px-4 py-6 text-center transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500/50 active:scale-[0.98]"
            >
              <span className="text-2xl font-semibold text-white sm:text-3xl">
                {stat.value}
              </span>
              <span className="text-xs text-zinc-500">{stat.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
