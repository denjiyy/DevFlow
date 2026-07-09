import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://devflow.example.com'),
  title: {
    default: 'DevFlow — Ship faster with the modern developer platform',
    template: '%s · DevFlow',
  },
  description:
    'Deploy, monitor, and scale your applications with zero configuration. DevFlow is the developer platform built for teams that would rather ship than configure.',
  keywords: [
    'developer platform',
    'deployment',
    'observability',
    'edge network',
    'devops',
    'SaaS dashboard',
  ],
  authors: [{ name: 'DevFlow' }],
  openGraph: {
    title: 'DevFlow — Ship faster with the modern developer platform',
    description: 'Deploy, monitor, and scale with zero configuration.',
    type: 'website',
    url: 'https://devflow.example.com',
    siteName: 'DevFlow',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevFlow — Ship faster',
    description: 'The developer platform built for teams that move fast.',
  },
};

export const viewport: Viewport = {
  themeColor: '#060608',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        {/* Ambient background layer */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          <div className="bg-grid mask-radial absolute inset-0 opacity-70" />
          <div className="absolute left-1/2 top-[-12%] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[130px]" />
          <div className="absolute right-[-8%] top-[18%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[130px]" />
          <div className="absolute bottom-[-12%] left-[-8%] h-[420px] w-[520px] rounded-full bg-fuchsia-600/10 blur-[130px]" />
        </div>
        {children}
      </body>
    </html>
  );
}
