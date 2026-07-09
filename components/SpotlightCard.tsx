'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  label?: string;
};

type Position = {
  x: number;
  y: number;
};

export function SpotlightCard({
  children,
  className = '',
  href,
  label,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>): void => {
    const element = ref.current;
    if (!element) {
      return;
    }
    const rect = element.getBoundingClientRect();
    setPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition duration-300 hover:border-white/20 ${
        href ? 'cursor-pointer active:scale-[0.99]' : ''
      } ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300"
        style={{
          opacity: isActive ? 1 : 0,
          background: `radial-gradient(420px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.14), transparent 42%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>

      {href ? (
        <>
          <Link
            href={href}
            aria-label={label}
            className="absolute inset-0 z-20 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500/50"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-4 z-10 text-zinc-500 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-white group-hover:opacity-100"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </>
      ) : null}
    </div>
  );
}
