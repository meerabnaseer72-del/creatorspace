import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <p className="text-sm font-semibold text-[#6D28D9] tabular-nums mb-2">
        404 — Page Not Found
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mb-4">
        We couldn’t find that page
      </h1>
      <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto mb-8">
        The link may be outdated or the page may have moved. Head back to the
        marketplace home or explore available creative services.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="px-5 py-2.5 text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-lg transition-colors"
        >
          Back to Home
        </Link>
        <Link
          to="/services"
          className="px-5 py-2.5 text-sm font-semibold text-[#0F172A] bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
        >
          Explore Services
        </Link>
      </div>
    </div>
  );
}
