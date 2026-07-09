'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowLeft,
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  Command,
  LayoutDashboard,
  LogOut,
  Menu,
  RefreshCw,
  Rocket,
  ScrollText,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Dropdown, DropdownItem } from '@/components/dashboard/Dropdown';
import { CommandPalette } from '@/components/dashboard/CommandPalette';

type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'deployments', label: 'Deployments', icon: Rocket },
  { id: 'logs', label: 'Logs', icon: ScrollText },
  { id: 'security', label: 'Security', icon: ShieldCheck },
];

const PROJECTS: string[] = ['acme-corp', 'side-project', 'playground'];

type EnvironmentOption = {
  label: string;
  dot: string;
};

const ENVIRONMENTS: EnvironmentOption[] = [
  { label: 'Production', dot: 'bg-emerald-400' },
  { label: 'Preview', dot: 'bg-amber-400' },
  { label: 'Development', dot: 'bg-sky-400' },
];

type NotificationItem = {
  id: string;
  title: string;
  detail: string;
  section: string;
  time: string;
};

const NOTIFICATIONS: NotificationItem[] = [
  { id: 'n1', title: 'Deployment ready', detail: 'acme-corp promoted to production', section: 'deployments', time: '2m' },
  { id: 'n2', title: 'New advisory', detail: '2 low-severity dependency issues', section: 'security', time: '1h' },
  { id: 'n3', title: 'Traffic spike', detail: 'Requests up 24% in us-east-1', section: 'analytics', time: '3h' },
];

type DeployStatus = 'idle' | 'deploying' | 'done';

export function DashboardShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [paletteOpen, setPaletteOpen] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.5, 1] },
    );

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent): void => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((previous) => !previous);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const openPalette = (): void => {
    setSidebarOpen(false);
    setPaletteOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Sidebar
        activeSection={activeSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenPalette={openPalette}
      />

      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      ) : null}

      <div className="flex min-h-screen flex-col lg:pl-64">
        <Topbar
          activeSection={activeSection}
          onOpenSidebar={() => setSidebarOpen(true)}
          onOpenPalette={openPalette}
        />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}

type SidebarProps = {
  activeSection: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenPalette: () => void;
};

function Sidebar({ activeSection, isOpen, onClose, onOpenPalette }: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-white/10 bg-[#0a0a0d]/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-glow-sm">
              <Zap className="h-4 w-4 text-white" fill="currentColor" />
            </span>
            <span className="text-base font-semibold tracking-tight text-white">DevFlow</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 transition-colors hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-3 py-3">
          <ProjectSwitcher />
        </div>

        <nav aria-label="Dashboard sections" className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={onClose}
                aria-current={isActive ? 'true' : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-violet-500/10 text-white ring-1 ring-inset ring-violet-500/30'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-violet-300' : ''}`} />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-white/10 p-3">
          <SettingsMenu onOpenPalette={onOpenPalette} />
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
          <div className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-semibold text-white">
              DT
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">Denis T.</p>
              <p className="truncate text-xs text-zinc-500">Pro workspace</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function ProjectSwitcher() {
  const [project, setProject] = useState<string>(PROJECTS[0]);

  return (
    <Dropdown
      ariaLabel="Switch project"
      panelClassName="w-[13.5rem]"
      triggerClassName="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 transition-colors hover:bg-white/10 active:scale-[0.98]"
      trigger={
        <>
          <span className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-violet-500 to-fuchsia-500 text-[10px] font-bold text-white">
              {project.charAt(0).toUpperCase()}
            </span>
            {project}
          </span>
          <ChevronDown className="h-4 w-4 text-zinc-500" />
        </>
      }
    >
      {PROJECTS.map((option) => (
        <DropdownItem key={option} onSelect={() => setProject(option)}>
          <span className="flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-violet-500 to-fuchsia-500 text-[10px] font-bold text-white">
            {option.charAt(0).toUpperCase()}
          </span>
          <span className="flex-1">{option}</span>
          {option === project ? <Check className="h-4 w-4 text-violet-300" /> : null}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}

function SettingsMenu({ onOpenPalette }: { onOpenPalette: () => void }) {
  return (
    <Dropdown
      side="top"
      ariaLabel="Settings"
      panelClassName="w-[13.5rem]"
      triggerClassName="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
      trigger={
        <>
          <Settings className="h-4 w-4" />
          Settings
        </>
      }
    >
      <DropdownItem icon={Command} onSelect={onOpenPalette}>
        <span className="flex-1">Command menu</span>
        <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-500">
          ⌘K
        </kbd>
      </DropdownItem>
      <DropdownItem icon={BookOpen} href="/docs">
        Documentation
      </DropdownItem>
      <DropdownItem icon={Sparkles} href="/changelog">
        Changelog
      </DropdownItem>
      <div className="my-1 border-t border-white/10" />
      <DropdownItem icon={ArrowLeft} href="/">
        Back to site
      </DropdownItem>
      <DropdownItem icon={LogOut} href="/">
        Sign out
      </DropdownItem>
    </Dropdown>
  );
}

type TopbarProps = {
  activeSection: string;
  onOpenSidebar: () => void;
  onOpenPalette: () => void;
};

function Topbar({ activeSection, onOpenSidebar, onOpenPalette }: TopbarProps) {
  const current = NAV_ITEMS.find((item) => item.id === activeSection);
  const title = current ? current.label : 'Overview';

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-white/10 bg-[#060608]/70 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onOpenSidebar}
        aria-label="Open sidebar"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-300 transition-colors hover:text-white active:scale-95 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-2 text-sm">
        <span className="hidden text-zinc-500 sm:inline">Dashboard</span>
        <span className="hidden text-zinc-600 sm:inline">/</span>
        <span className="font-medium text-white">{title}</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenPalette}
          className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300 md:flex"
        >
          <Search className="h-4 w-4" />
          <span>Search…</span>
          <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-400">
            ⌘K
          </kbd>
        </button>

        <button
          type="button"
          onClick={onOpenPalette}
          aria-label="Search"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:text-white active:scale-95 md:hidden"
        >
          <Search className="h-4 w-4" />
        </button>

        <EnvSwitcher />
        <DeployButton />
        <Notifications />
      </div>
    </header>
  );
}

function EnvSwitcher() {
  const [environment, setEnvironment] = useState<EnvironmentOption>(ENVIRONMENTS[0]);

  return (
    <Dropdown
      align="right"
      ariaLabel="Switch environment"
      className="hidden sm:block"
      panelClassName="w-44"
      triggerClassName="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-zinc-300 transition-colors hover:bg-white/10"
      trigger={
        <>
          <span className={`h-1.5 w-1.5 rounded-full ${environment.dot}`} />
          {environment.label}
          <ChevronDown className="h-3 w-3 text-zinc-500" />
        </>
      }
    >
      {ENVIRONMENTS.map((option) => (
        <DropdownItem key={option.label} onSelect={() => setEnvironment(option)}>
          <span className={`h-1.5 w-1.5 rounded-full ${option.dot}`} />
          <span className="flex-1">{option.label}</span>
          {option.label === environment.label ? (
            <Check className="h-4 w-4 text-violet-300" />
          ) : null}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}

function DeployButton() {
  const [status, setStatus] = useState<DeployStatus>('idle');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  const handleDeploy = (): void => {
    if (status !== 'idle') {
      return;
    }
    setStatus('deploying');
    timers.current.push(setTimeout(() => setStatus('done'), 2200));
    timers.current.push(setTimeout(() => setStatus('idle'), 3800));
  };

  return (
    <button
      type="button"
      onClick={handleDeploy}
      disabled={status !== 'idle'}
      className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 px-3 py-1.5 text-xs font-semibold text-white shadow-glow-sm transition-all hover:brightness-110 active:scale-95 disabled:cursor-default disabled:opacity-90"
    >
      {status === 'deploying' ? (
        <>
          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
          Deploying…
        </>
      ) : status === 'done' ? (
        <>
          <Check className="h-3.5 w-3.5" />
          Deployed
        </>
      ) : (
        <>
          <Rocket className="h-3.5 w-3.5" />
          Deploy
        </>
      )}
    </button>
  );
}

function Notifications() {
  const [hasUnread, setHasUnread] = useState<boolean>(true);

  return (
    <Dropdown
      align="right"
      ariaLabel="Notifications"
      panelClassName="w-72"
      onOpenChange={(next) => {
        if (next) {
          setHasUnread(false);
        }
      }}
      triggerClassName="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:text-white"
      trigger={
        <>
          <Bell className="h-4 w-4" />
          {hasUnread ? (
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-400" />
          ) : null}
        </>
      }
    >
      <p className="px-2.5 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Notifications
      </p>
      {NOTIFICATIONS.map((notification) => (
        <DropdownItem
          key={notification.id}
          onSelect={() => {
            window.location.hash = notification.section;
          }}
        >
          <span className="flex flex-1 flex-col">
            <span className="text-sm text-white">{notification.title}</span>
            <span className="text-xs text-zinc-500">{notification.detail}</span>
          </span>
          <span className="self-start text-[11px] text-zinc-600">{notification.time}</span>
        </DropdownItem>
      ))}
    </Dropdown>
  );
}
