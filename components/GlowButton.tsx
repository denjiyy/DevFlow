import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

type GlowButtonVariant = 'primary' | 'secondary';

type GlowButtonProps = {
  href: string;
  children: ReactNode;
  icon?: LucideIcon;
  variant?: GlowButtonVariant;
  external?: boolean;
  className?: string;
};

const PRIMARY_CLASSES =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12),0_8px_30px_-8px_rgba(139,92,246,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22),0_12px_40px_-6px_rgba(139,92,246,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 active:translate-y-0 active:scale-[0.98]';

const SECONDARY_CLASSES =
  'group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur transition-all duration-300 hover:border-white/25 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 active:scale-[0.98]';

export function GlowButton({
  href,
  children,
  icon: Icon,
  variant = 'primary',
  external = false,
  className = '',
}: GlowButtonProps) {
  const classes = `${variant === 'primary' ? PRIMARY_CLASSES : SECONDARY_CLASSES} ${className}`;

  const inner =
    variant === 'primary' ? (
      <>
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
        <span className="relative flex items-center gap-2">
          {children}
          {Icon ? (
            <Icon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          ) : null}
        </span>
      </>
    ) : (
      <>
        {Icon ? (
          <Icon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        ) : null}
        {children}
      </>
    );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
