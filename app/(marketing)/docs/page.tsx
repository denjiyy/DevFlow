import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';
import { CodeBlock } from '@/components/CodeBlock';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import type { DocsSection } from '@/components/docs/DocsSidebar';

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Install the DevFlow CLI, deploy your first project to the edge, and configure your workspace.',
};

const SECTIONS: DocsSection[] = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'installation', label: 'Installation' },
  { id: 'quickstart', label: 'Quickstart' },
  { id: 'deploying', label: 'Deploying' },
  { id: 'configuration', label: 'Configuration' },
  { id: 'cli', label: 'CLI reference' },
];

type CliCommand = {
  command: string;
  description: string;
};

const CLI_COMMANDS: CliCommand[] = [
  { command: 'devflow login', description: 'Authenticate the CLI with your workspace.' },
  { command: 'devflow init', description: 'Scaffold a devflow.json in the current project.' },
  { command: 'devflow dev', description: 'Run the local edge emulator on port 3000.' },
  { command: 'devflow deploy', description: 'Deploy a preview build from the current branch.' },
  { command: 'devflow deploy --prod', description: 'Promote the current build to production.' },
  { command: 'devflow logs --follow', description: 'Stream live logs from the edge network.' },
  { command: 'devflow rollback', description: 'Instantly revert to the previous deployment.' },
];

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[13px] text-violet-200">
      {children}
    </code>
  );
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 flex gap-3 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
      <p className="text-sm leading-relaxed text-zinc-300">{children}</p>
    </div>
  );
}

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <DocsSidebar sections={SECTIONS} />

        <article className="min-w-0 max-w-3xl">
          <header>
            <p className="text-sm font-medium text-violet-400">Docs</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Getting started with DevFlow
            </h1>
            <p className="mt-3 text-pretty text-zinc-400">
              Everything you need to deploy your first project to the edge in
              minutes — no configuration required.
            </p>
          </header>

          <div className="mt-12 space-y-14">
            <section id="introduction" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold tracking-tight text-white">Introduction</h2>
              <p className="mt-4 leading-relaxed text-zinc-400">
                DevFlow is a developer platform for building, shipping, and observing
                applications on a global edge network. It pairs a zero-config build
                pipeline with real-time observability, so you can go from{' '}
                <Code>git push</Code> to a live URL without touching a YAML file.
              </p>
              <p className="mt-4 leading-relaxed text-zinc-400">
                This guide walks through installing the CLI, deploying a project, and
                configuring your workspace. Everything on this page is a demo — the
                commands are illustrative.
              </p>
            </section>

            <section id="installation" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold tracking-tight text-white">Installation</h2>
              <p className="mt-4 leading-relaxed text-zinc-400">
                Install the DevFlow CLI globally with your package manager of choice.
                The CLI requires <Code>Node.js 18.17</Code> or newer.
              </p>
              <div className="mt-5">
                <CodeBlock filename="terminal" code={'npm install -g @devflow/cli\n\ndevflow --version\n# devflow/2.0.0 darwin-arm64 node-20'} />
              </div>
            </section>

            <section id="quickstart" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold tracking-tight text-white">Quickstart</h2>
              <p className="mt-4 leading-relaxed text-zinc-400">
                Authenticate, then scaffold a config in your existing project. The{' '}
                <Code>init</Code> command detects your framework automatically.
              </p>
              <div className="mt-5">
                <CodeBlock filename="terminal" code={'devflow login\n# ✓ Authenticated as you@acme.dev\n\ncd my-app\ndevflow init\n# ✓ Detected Next.js · wrote devflow.json'} />
              </div>
              <Callout>
                Already have a project on GitHub? Connect the repo and DevFlow will
                deploy every push and pull request automatically.
              </Callout>
            </section>

            <section id="deploying" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold tracking-tight text-white">Deploying</h2>
              <p className="mt-4 leading-relaxed text-zinc-400">
                Run <Code>deploy</Code> to ship a preview, or add <Code>--prod</Code> to
                promote straight to production. Every deployment is atomic and instantly
                reversible with <Code>devflow rollback</Code>.
              </p>
              <div className="mt-5">
                <CodeBlock filename="terminal" code={'devflow deploy --prod\n# ↑ Uploading build artifacts (12 files)\n# → Building on global edge network…\n# ✓ Compiled successfully in 1.24s\n# ✓ Live at https://acme.devflow.app'} />
              </div>
            </section>

            <section id="configuration" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold tracking-tight text-white">Configuration</h2>
              <p className="mt-4 leading-relaxed text-zinc-400">
                The <Code>devflow.json</Code> file lives at your project root. Sensible
                defaults are applied for anything you omit.
              </p>
              <div className="mt-5">
                <CodeBlock
                  filename="devflow.json"
                  code={'{\n  "name": "acme-app",\n  "framework": "nextjs",\n  "regions": ["us-east-1", "eu-west-1"],\n  "build": {\n    "command": "next build",\n    "output": ".next"\n  },\n  "env": {\n    "NODE_ENV": "production"\n  }\n}'}
                />
              </div>
            </section>

            <section id="cli" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold tracking-tight text-white">CLI reference</h2>
              <p className="mt-4 leading-relaxed text-zinc-400">
                The most common commands you’ll reach for day to day.
              </p>
              <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/[0.03] text-xs text-zinc-500">
                    <tr>
                      <th className="px-4 py-3 font-medium">Command</th>
                      <th className="px-4 py-3 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {CLI_COMMANDS.map((item) => (
                      <tr key={item.command} className="transition-colors hover:bg-white/[0.02]">
                        <td className="whitespace-nowrap px-4 py-3">
                          <code className="font-mono text-[13px] text-violet-200">{item.command}</code>
                        </td>
                        <td className="px-4 py-3 text-zinc-400">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
