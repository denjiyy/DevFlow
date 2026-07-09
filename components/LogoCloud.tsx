const COMPANIES: string[] = [
  'Vertex',
  'Nimbus',
  'Quanta',
  'Hyperspace',
  'Northwind',
  'Loop',
];

export function LogoCloud() {
  return (
    <section
      id="customers"
      aria-label="Trusted by leading teams"
      className="mx-auto max-w-6xl px-4 py-10 sm:px-6"
    >
      <p className="text-center text-xs font-medium uppercase tracking-widest text-zinc-600">
        Trusted by fast-moving engineering teams
      </p>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {COMPANIES.map((company) => (
          <li key={company}>
            <a
              href="#get-started"
              className="block rounded px-1 text-lg font-semibold tracking-tight text-zinc-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 active:scale-95"
            >
              {company}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
