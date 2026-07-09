import Link from 'next/link';
import { Zap } from 'lucide-react';
import type { ComponentType } from 'react';
import { GitHubIcon, LinkedInIcon, XIcon } from '@/components/SocialIcons';

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const COLUMNS: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Docs', href: '/docs' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'CLI reference', href: '/docs' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Status', href: '/dashboard' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/' },
      { label: 'Blog', href: '/' },
      { label: 'Careers', href: '/' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
];

type SocialLink = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

const SOCIALS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com', icon: GitHubIcon },
  { label: 'X', href: 'https://x.com', icon: XIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedInIcon },
];

export function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
              aria-label="DevFlow home"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600">
                <Zap className="h-4 w-4 text-white" fill="currentColor" />
              </span>
              <span className="text-lg font-semibold text-white">DevFlow</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-zinc-500">
              The developer platform for teams that would rather ship than configure.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 active:scale-95"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-sm font-semibold text-white">{column.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="rounded text-sm text-zinc-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-zinc-600">
            © 2026 DevFlow, Inc. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">Built with Next.js · Deployed on Vercel</p>
        </div>
      </div>
    </footer>
  );
}
