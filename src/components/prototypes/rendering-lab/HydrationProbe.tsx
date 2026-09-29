import { useEffect, useState } from 'react';

type HydrationState =
  | { status: 'waiting' }
  | { status: 'hydrated'; hydratedAt: string; elapsedMs: number };

type HydrationProbeProps = {
  description: string;
  initialServerTimestamp: string;
  mode: string;
};

export default function HydrationProbe({
  description,
  initialServerTimestamp,
  mode,
}: HydrationProbeProps) {
  const [count, setCount] = useState(0);
  const [hydration, setHydration] = useState<HydrationState>({
    status: 'waiting',
  });

  useEffect(() => {
    setHydration({
      status: 'hydrated',
      hydratedAt: new Date().toISOString(),
      elapsedMs: Math.round(performance.now()),
    });
  }, []);

  return (
    <article
      className="hydration-probe"
      data-hydration-mode={mode}
      data-hydration-status={hydration.status}
    >
      <div className="hydration-probe__heading">
        <h2>{mode}</h2>
        <span
          className={`hydration-status hydration-status--${hydration.status}`}
        >
          {hydration.status}
        </span>
      </div>
      <p>{description}</p>
      <dl>
        <div>
          <dt>HTML rendered</dt>
          <dd>{initialServerTimestamp}</dd>
        </div>
        <div>
          <dt>Client hydrated</dt>
          <dd>
            {hydration.status === 'hydrated'
              ? `${hydration.hydratedAt} (${hydration.elapsedMs}ms)`
              : 'not hydrated'}
          </dd>
        </div>
      </dl>
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Interaction count: {count}
      </button>
    </article>
  );
}
