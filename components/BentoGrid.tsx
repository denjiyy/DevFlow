import { Gauge, Globe, Rocket, ShieldCheck, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';
import { DashboardShowcase } from '@/components/DashboardShowcase';
import { MiniChart } from '@/components/MiniChart';

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
};

const FEATURES: Feature[] = [
  {
    icon: Rocket,
    title: 'Instant deploys',
    description:
      'Push to Git and watch it go live in under three seconds — with automatic rollbacks the moment something looks off.',
    href: '/dashboard',
  },
  {
    icon: Globe,
    title: 'Global edge network',
    description:
      '320+ edge locations keep your app milliseconds away from every user, everywhere on earth.',
    href: '/docs',
  },
  {
    icon: Users,
    title: 'Preview every PR',
    description:
      'Each pull request gets a shareable preview URL with fully isolated data.',
    href: '/dashboard',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise security',
    description:
      'SOC 2 Type II, SSO/SAML, and immutable audit logs — enabled by default.',
    href: '/docs',
  },
];

function FeatureCard({ icon: Icon, title, description, href }: Feature) {
  return (
    <SpotlightCard href={href} label={`${title} — learn more`}>
      <div className="flex h-full flex-col p-6">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent text-violet-300 transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
      </div>
    </SpotlightCard>
  );
}

function MetricsCard() {
  return (
    <SpotlightCard href="/dashboard" label="Real-time metrics — open dashboard">
      <div className="flex h-full flex-col p-6">
        <div className="flex items-center justify-between">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent text-cyan-300 transition-transform duration-300 group-hover:scale-110">
            <Gauge className="h-5 w-5" />
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live
          </span>
        </div>
        <h3 className="mt-4 text-base font-semibold text-white">Real-time metrics</h3>
        <p className="mt-1 text-sm text-zinc-400">Latency across all regions</p>
        <div className="mt-auto pt-4">
          <MiniChart />
        </div>
      </div>
    </SpotlightCard>
  );
}

export function BentoGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-violet-400">
          Everything you need
        </p>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          One platform to build, ship, and observe
        </h2>
        <p className="mt-4 text-pretty text-zinc-400">
          From your first commit to production scale — DevFlow gives your team the
          tools to move fast without breaking things.
        </p>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(0,1fr)]">
        <DashboardShowcase className="md:col-span-2 lg:row-span-2" />
        <FeatureCard {...FEATURES[0]} />
        <FeatureCard {...FEATURES[1]} />
        <MetricsCard />
        <FeatureCard {...FEATURES[2]} />
        <FeatureCard {...FEATURES[3]} />
      </div>
    </section>
  );
}
