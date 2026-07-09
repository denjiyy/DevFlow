'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, Star, X, Zap } from 'lucide-react';
import { GlowButton } from '@/components/GlowButton';
import { GitHubIcon } from '@/components/SocialIcons';

type NavLink = {
  label: string;
  href: string;
  match?: string;
};

const NAV_LINKS: NavLink[] = [
  { label: 'Features', href: '/#features' },
  { label: 'Dashboard', href: '/dashboard', match: '/dashboard' },
  { label: 'Docs', href: '/docs', match: '/docs' },
  { label: 'Changelog', href: '/changelog', match: '/changelog' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = (): void => setIsOpen(false);
  const isActive = (link: NavLink): boolean =>
    link.match ? pathname === link.match || pathname.startsWith(`${link.match}/`) : false;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled
          ? 'border-b border-white/10 bg-[#060608]/70 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
          aria-label="DevFlow home"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-glow-sm">
            <Zap className="h-4 w-4 text-white" fill="currentColor" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">
            DevFlow
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 ${
                  isActive(link)
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
          >
            <GitHubIcon className="h-4 w-4" />
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5" />
              18.2k
            </span>
          </a>
          <GlowButton href="/dashboard">Start building</GlowButton>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 active:scale-95 md:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden bg-[#060608]/95 backdrop-blur-xl transition-[max-height] duration-300 ease-out md:hidden ${
          isOpen ? 'max-h-96 border-b border-white/10' : 'max-h-0'
        }`}
      >
        <ul className="space-y-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeMenu}
                className={`block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-white/5 hover:text-white ${
                  isActive(link) ? 'bg-white/5 text-white' : 'text-zinc-300'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href="/dashboard"
              onClick={closeMenu}
              className="block rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-600 px-3 py-2.5 text-center text-sm font-semibold text-white active:scale-[0.98]"
            >
              Start building
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
