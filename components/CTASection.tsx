import { ArrowRight } from 'lucide-react';
import { GlowButton } from '@/components/GlowButton';

export function CTASection() {
  return (
    <section id="get-started" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] px-6 py-16 text-center sm:px-16">
        <div
          aria-hidden="true"
          className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-40 w-[600px] -translate-x-1/2 rounded-full bg-violet-600/30 blur-[100px]"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to ship faster than ever?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-zinc-400">
            Spin up your first project in minutes. Open source, self-hostable, and
            built to get out of your way.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GlowButton href="/dashboard" icon={ArrowRight}>
              Open the dashboard
            </GlowButton>
            <GlowButton href="https://github.com" variant="secondary" external>
              View on GitHub
            </GlowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
