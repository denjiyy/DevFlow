'use client';

import Link from 'next/link';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

const DropdownCloseContext = createContext<() => void>(() => undefined);

export function useDropdownClose(): () => void {
  return useContext(DropdownCloseContext);
}

type DropdownProps = {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  triggerClassName?: string;
  panelClassName?: string;
  ariaLabel?: string;
  align?: 'left' | 'right';
  side?: 'top' | 'bottom';
  onOpenChange?: (open: boolean) => void;
};

export function Dropdown({
  trigger,
  children,
  className = '',
  triggerClassName = '',
  panelClassName = '',
  ariaLabel,
  align = 'left',
  side = 'bottom',
  onOpenChange,
}: DropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const onOpenChangeRef = useRef(onOpenChange);

  useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  }, [onOpenChange]);

  const changeOpen = useCallback((next: boolean): void => {
    setOpen(next);
    onOpenChangeRef.current?.(next);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const handlePointer = (event: PointerEvent): void => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        changeOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        changeOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('pointerdown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, changeOpen]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => changeOpen(!open)}
        className={triggerClassName}
      >
        {trigger}
      </button>
      {open ? (
        <div
          role="menu"
          className={`absolute z-50 rounded-xl border border-white/10 bg-[#0c0c10]/95 p-1 shadow-2xl backdrop-blur-xl ${
            side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          } ${align === 'right' ? 'right-0' : 'left-0'} ${panelClassName}`}
        >
          <DropdownCloseContext.Provider value={() => changeOpen(false)}>
            {children}
          </DropdownCloseContext.Provider>
        </div>
      ) : null}
    </div>
  );
}

type DropdownItemProps = {
  children: ReactNode;
  icon?: LucideIcon;
  onSelect?: () => void;
  href?: string;
  external?: boolean;
};

const ITEM_CLASSES =
  'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:bg-white/5 focus-visible:outline-none';

export function DropdownItem({ children, icon: Icon, onSelect, href, external }: DropdownItemProps) {
  const close = useDropdownClose();
  const iconNode = Icon ? <Icon className="h-4 w-4 shrink-0 text-zinc-500" /> : null;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          role="menuitem"
          onClick={close}
          className={ITEM_CLASSES}
        >
          {iconNode}
          {children}
        </a>
      );
    }
    return (
      <Link href={href} role="menuitem" onClick={close} className={ITEM_CLASSES}>
        {iconNode}
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      role="menuitem"
      onClick={() => {
        onSelect?.();
        close();
      }}
      className={ITEM_CLASSES}
    >
      {iconNode}
      {children}
    </button>
  );
}
