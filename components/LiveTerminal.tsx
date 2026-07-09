'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy, RotateCcw } from 'lucide-react';

type LineKind = 'command' | 'comment' | 'output' | 'success' | 'muted';

type TerminalLine = {
  kind: LineKind;
  text: string;
};

const SEQUENCE: TerminalLine[] = [
  { kind: 'comment', text: '# Deploy your project to the edge' },
  { kind: 'command', text: 'devflow deploy --prod' },
  { kind: 'muted', text: '↑ Uploading build artifacts (12 files)' },
  { kind: 'output', text: '→ Building on global edge network…' },
  { kind: 'success', text: '✓ Compiled successfully in 1.24s' },
  { kind: 'success', text: '✓ Live at https://acme.devflow.app' },
  { kind: 'comment', text: '# Stream production logs' },
  { kind: 'command', text: 'devflow logs --follow' },
  { kind: 'output', text: 'GET   /api/users        200   14ms' },
  { kind: 'output', text: 'POST  /api/checkout     201   42ms' },
  { kind: 'success', text: '✓ 0 errors · 1.2k req/min · healthy' },
];

const LINE_COLOR: Record<LineKind, string> = {
  command: 'text-zinc-100',
  comment: 'text-zinc-500',
  output: 'text-cyan-300/90',
  success: 'text-emerald-400',
  muted: 'text-zinc-500',
};

type TerminalRowProps = {
  line: TerminalLine;
  isTyping?: boolean;
  onCopy?: (text: string) => void;
  isCopied?: boolean;
};

function TerminalRow({ line, isTyping = false, onCopy, isCopied = false }: TerminalRowProps) {
  const isCommand = line.kind === 'command';

  const body = (
    <>
      <span className="w-3 shrink-0 select-none font-semibold text-violet-400">
        {isCommand ? '$' : ''}
      </span>
      <span className={`min-w-0 whitespace-pre-wrap break-words ${LINE_COLOR[line.kind]}`}>
        {line.text}
        {isTyping ? (
          <span className="ml-0.5 inline-block h-[1.05em] w-[7px] -translate-y-px animate-blink rounded-[1px] bg-violet-400 align-middle" />
        ) : null}
      </span>
    </>
  );

  if (isCommand && onCopy && !isTyping) {
    return (
      <button
        type="button"
        onClick={() => onCopy(line.text)}
        title="Click to copy command"
        className="group/row flex w-full items-start gap-2 rounded py-[1px] text-left transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500/40"
      >
        {body}
        <span className="ml-auto flex shrink-0 items-center gap-1 pl-2 text-[11px]">
          {isCopied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <Copy className="h-3 w-3 text-zinc-500 opacity-0 transition-opacity group-hover/row:opacity-100" />
          )}
        </span>
      </button>
    );
  }

  return <div className="flex items-start gap-2 py-[1px]">{body}</div>;
}

type TerminalStreamProps = {
  onCopy: (text: string) => void;
  copiedText: string | null;
};

function TerminalStream({ onCopy, copiedText }: TerminalStreamProps) {
  const [completed, setCompleted] = useState<TerminalLine[]>([]);
  const [typing, setTyping] = useState<TerminalLine | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const sleep = (ms: number): Promise<void> =>
      new Promise((resolve) => {
        timers.push(setTimeout(resolve, ms));
      });

    const run = async (): Promise<void> => {
      await sleep(500);
      while (!cancelled) {
        setCompleted([]);
        setTyping(null);

        for (const line of SEQUENCE) {
          if (cancelled) {
            return;
          }

          if (line.kind === 'command') {
            for (let i = 1; i <= line.text.length; i += 1) {
              if (cancelled) {
                return;
              }
              setTyping({ kind: 'command', text: line.text.slice(0, i) });
              await sleep(38 + Math.random() * 45);
            }
            await sleep(350);
            if (cancelled) {
              return;
            }
            setTyping(null);
            setCompleted((previous) => [...previous, line]);
          } else {
            await sleep(line.kind === 'comment' ? 320 : 180);
            if (cancelled) {
              return;
            }
            setCompleted((previous) => [...previous, line]);
          }
        }

        await sleep(2600);
      }
    };

    void run();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [completed, typing]);

  return (
    <div
      ref={scrollRef}
      className="h-72 overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed sm:text-sm"
    >
      {completed.map((line, index) => (
        <TerminalRow
          key={index}
          line={line}
          onCopy={onCopy}
          isCopied={copiedText === line.text}
        />
      ))}
      {typing ? <TerminalRow line={typing} isTyping /> : null}
    </div>
  );
}

export function LiveTerminal() {
  const [runId, setRunId] = useState<number>(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = (text: string): void => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      void navigator.clipboard.writeText(text).catch(() => undefined);
    }
    setCopiedText(text);
    if (copyTimer.current) {
      clearTimeout(copyTimer.current);
    }
    copyTimer.current = setTimeout(() => setCopiedText(null), 1400);
  };

  const handleReplay = (): void => setRunId((previous) => previous + 1);

  useEffect(
    () => () => {
      if (copyTimer.current) {
        clearTimeout(copyTimer.current);
      }
    },
    [],
  );

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-violet-600/40 via-fuchsia-500/30 to-cyan-500/40 opacity-40 blur-lg transition-opacity duration-500 group-hover:opacity-70" />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0d]/90 shadow-2xl backdrop-blur">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-3 flex items-center gap-2 text-xs text-zinc-500">
            <span className="hidden sm:inline">bash</span>
            <span>— devflow-cli</span>
          </span>
          <button
            type="button"
            onClick={handleReplay}
            aria-label="Replay terminal animation"
            title="Replay"
            className="ml-auto inline-flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 active:scale-90"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
        <TerminalStream key={runId} onCopy={handleCopy} copiedText={copiedText} />
      </div>
    </div>
  );
}
