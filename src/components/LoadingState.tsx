export function LoadingState({ count = 6 }: { count?: number }) {
  return (
    <div
      aria-label="Loading content"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
        >
          <div className="aspect-[4/3] bg-slate-100" />
          <div className="p-5 space-y-3">
            <div className="h-3 w-28 bg-slate-100 rounded" />
            <div className="h-5 w-4/5 bg-slate-200 rounded" />
            <div className="h-4 w-full bg-slate-100 rounded" />
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="h-4 w-24 bg-slate-100 rounded" />
              <div className="h-5 w-16 bg-slate-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
