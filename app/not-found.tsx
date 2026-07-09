import Link from 'next/link';
import { House, Zap } from 'lucide-react';
import { GlowButton } from '@/components/GlowButton';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="DevFlow home">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-glow-sm">
            <Zap className="h-4 w-4 text-white" fill="currentColor" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">DevFlow</span>
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 pb-24 text-center">
        <p className="font-mono text-sm font-medium text-violet-400">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          This route hasn’t shipped
        </h1>
        <p className="mt-4 text-pretty text-zinc-400">
          We searched every edge location, but there’s no deployment matching this
          path. It may have been moved or never existed.
        </p>

        <div className="mt-8 w-full rounded-xl border border-white/10 bg-[#0a0a0d]/80 p-4 text-left font-mono text-xs leading-relaxed shadow-2xl">
          <p>
            <span className="text-violet-400">$</span>{' '}
            <span className="text-zinc-200">devflow open</span>{' '}
            <span className="text-zinc-500">&lt;this-page&gt;</span>
          </p>
          <p className="mt-1 text-red-400">✗ error 404 · no route registered on the edge</p>
          <p className="mt-1 text-emerald-400">→ try heading back home</p>
        </div>

        <div className="mt-8">
          <GlowButton href="/" icon={House}>
            Back to home
          </GlowButton>
        </div>
      </main>
    </div>
  );
}
