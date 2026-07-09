'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import {
  BookOpen,
  House,
  LayoutDashboard,
  Rocket,
  ScrollText,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type CommandItem = {
  id: string;
  label: string;
  group: string;
  icon: LucideIcon;
  href?: string;
  sectionId?: string;
};

const COMMANDS: CommandItem[] = [
  { id: 'overview', label: 'Overview', group: 'Dashboard', icon: LayoutDashboard, sectionId: 'overview' },
  { id: 'analytics', label: 'Analytics', group: 'Dashboard', icon: TrendingUp, sectionId: 'analytics' },
  { id: 'deployments', label: 'Deployments', group: 'Dashboard', icon: Rocket, sectionId: 'deployments' },
  { id: 'logs', label: 'Logs', group: 'Dashboard', icon: ScrollText, sectionId: 'logs' },
  { id: 'security', label: 'Security', group: 'Dashboard', icon: ShieldCheck, sectionId: 'security' },
  { id: 'home', label: 'Landing page', group: 'Pages', icon: House, href: '/' },
  { id: 'docs', label: 'Documentation', group: 'Pages', icon: BookOpen, href: '/docs' },
  { id: 'changelog', label: 'Changelog', group: 'Pages', icon: Sparkles, href: '/changelog' },
];

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo<CommandItem[]>(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      return COMMANDS;
    }
    return COMMANDS.filter(
      (item) =>
        item.label.toLowerCase().includes(term) || item.group.toLowerCase().includes(term),
    );
  }, [query]);

  useEffect(() => {
    if (!open) {
      return;
    }
    setQuery('');
    setActiveIndex(0);
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 20);
    return () => clearTimeout(focusTimer);
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!open) {
    return null;
  }

  const activate = (item: CommandItem): void => {
    onClose();
    if (item.href) {
      router.push(item.href);
    } else if (item.sectionId) {
      window.location.hash = item.sectionId;
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const item = results[activeIndex];
      if (item) {
        activate(item);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Command menu">
      <button
        type="button"
        aria-label="Close command menu"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/60 backdrop-blur-sm"
      />
      <div className="absolute left-1/2 top-24 w-[92%] max-w-lg -translate-x-1/2">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c10]/95 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 border-b border-white/10 px-4">
            <Search className="h-4 w-4 shrink-0 text-zinc-500" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search sections and pages…"
              aria-label="Search"
              className="w-full bg-transparent py-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
            />
            <kbd className="hidden shrink-0 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-500 sm:block">
              esc
            </kbd>
          </div>

          <div className="max-h-80 overflow-y-auto p-2">
            {results.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm text-zinc-500">
                No results for “{query}”.
              </p>
            ) : (
              <ul>
                {results.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = index === activeIndex;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => activate(item)}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                          isActive ? 'bg-violet-500/15 text-white' : 'text-zinc-300 hover:bg-white/5'
                        }`}
                      >
                        <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-violet-300' : 'text-zinc-500'}`} />
                        <span className="flex-1">{item.label}</span>
                        <span className="text-[11px] text-zinc-600">{item.group}</span>
                        {isActive ? <span className="text-xs text-zinc-500">↵</span> : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
