type Region = {
  label: string;
  value: number;
  requests: string;
};

const REGIONS: Region[] = [
  { label: 'us-east-1', value: 42, requests: '538k' },
  { label: 'eu-west-1', value: 28, requests: '359k' },
  { label: 'ap-south-1', value: 18, requests: '231k' },
  { label: 'sa-east-1', value: 12, requests: '154k' },
];

export function RegionBars() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-300">Traffic by region</h3>
        <span className="text-xs text-zinc-500">last 24h</span>
      </div>

      <ul className="mt-5 flex-1 space-y-4">
        {REGIONS.map((region) => (
          <li key={region.label}>
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-zinc-300">{region.label}</span>
              <span className="tabular-nums text-zinc-500">
                {region.requests} · {region.value}%
              </span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                style={{ width: `${region.value}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
