import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    'Monitor deployments, analytics, live logs, and security posture in the DevFlow dashboard.',
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <DashboardShell>{children}</DashboardShell>;
}
