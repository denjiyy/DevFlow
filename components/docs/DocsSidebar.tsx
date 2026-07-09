'use client';

import { useEffect, useState } from 'react';

export type DocsSection = {
  id: string;
  label: string;
};

type DocsSidebarProps = {
  sections: DocsSection[];
};

export function DocsSidebar({ sections }: DocsSidebarProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-15% 0px -75% 0px', threshold: [0, 1] },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Documentation" className="sticky top-24 hidden lg:block">
      <p className="px-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Documentation
      </p>
      <ul className="mt-3 space-y-0.5">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-violet-500/10 text-white ring-1 ring-inset ring-violet-500/30'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
