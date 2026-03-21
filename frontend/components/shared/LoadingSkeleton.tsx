export default function LoadingSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="mt-4 space-y-4 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="bg-zinc-800 rounded-lg p-5 space-y-3">
          <div className="h-4 bg-zinc-700 rounded w-1/3" />
          <div className="h-3 bg-zinc-700 rounded w-2/3" />
          <div className="h-3 bg-zinc-700 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}
