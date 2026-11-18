import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  Star,
  Clock,
  RefreshCw,
  Check,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/formatters';
import { SafeImage } from '../components/SafeImage';
import { EmptyState } from '../components/EmptyState';

export function ServiceDetails() {
  const { id } = useParams<{ id: string }>();
  const { getServiceById, getCreatorById, showToast } = useApp();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const service = id ? getServiceById(id) : undefined;
  const creator = service ? getCreatorById(service.creatorId) : undefined;

  if (!service) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          title="Service package not found"
          description="This service may have been removed or is no longer available in the marketplace."
          actionLabel="Explore Services"
          actionTo="/services"
        />
      </div>
    );
  }

  const saved = isInWishlist(service.id);

  const handleToggleWishlist = () => {
    const added = toggleWishlist(service.id);
    showToast(
      added
        ? `Saved "${service.title}" to wishlist.`
        : `Removed "${service.title}" from wishlist.`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-6"
      >
        <Link
          to="/services"
          className="inline-flex items-center gap-1 hover:text-[#6D28D9] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Explore Services</span>
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          to={`/services?category=${encodeURIComponent(service.category)}`}
          className="hover:text-[#6D28D9] transition-colors"
        >
          {service.category}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-[#0F172A] font-medium truncate max-w-xs sm:max-w-md">
          {service.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Main Column */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
              <span className="text-[#6D28D9]">{service.category}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-[#0F172A] tabular-nums">
                <Star
                  className="w-3.5 h-3.5 text-amber-500 fill-amber-500"
                  aria-hidden="true"
                />
                {service.rating.toFixed(1)} ({service.reviewCount} client reviews)
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight text-balance">
              {service.title}
            </h1>
          </div>

          {/* Large Service Showcase Image */}
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <SafeImage
              src={service.image}
              alt={service.title}
              fallbackTitle={service.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Complete Description */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-4">
            <h2 className="text-lg font-bold text-[#0F172A]">
              Package Scope &amp; Overview
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {service.fullDescription}
            </p>
          </section>

          {/* Features & Deliverables */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-4">
            <h2 className="text-lg font-bold text-[#0F172A]">
              Included Deliverables
            </h2>
            <ul className="space-y-3">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-700"
                >
                  <span className="w-5 h-5 rounded-full bg-[#F4F3FF] text-[#6D28D9] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Creator Information & Portfolio Samples */}
          {creator && (
            <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <Link to={`/creators/${creator.id}`} className="shrink-0">
                    <SafeImage
                      src={creator.avatar}
                      alt={creator.name}
                      fallbackTitle={creator.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
                    />
                  </Link>
                  <div>
                    <p className="text-xs font-medium text-[#6D28D9]">
                      Service Creator
                    </p>
                    <h2 className="text-lg font-bold text-[#0F172A]">
                      <Link
                        to={`/creators/${creator.id}`}
                        className="hover:text-[#6D28D9] transition-colors"
                      >
                        {creator.name}
                      </Link>
                    </h2>
                    <p className="text-xs text-slate-500">
                      {creator.title} · {creator.location}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/creators/${creator.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6D28D9] hover:text-[#5B21B6] whitespace-nowrap"
                >
                  <span>View Full Profile</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {creator.introduction}
              </p>

              {creator.portfolio.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-[#0F172A]">
                    Recent Portfolio Samples
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {creator.portfolio.map((sample) => (
                      <Link
                        key={sample.id}
                        to={`/creators/${creator.id}`}
                        className="group block border border-slate-200 rounded-xl overflow-hidden"
                      >
                        <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                          <SafeImage
                            src={sample.image}
                            alt={sample.title}
                            fallbackTitle={sample.title}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-200"
                          />
                        </div>
                        <div className="p-3.5">
                          <p className="text-sm font-semibold text-[#0F172A] truncate">
                            {sample.title}
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            {sample.client} · {sample.year}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              {creator.reviews.length > 0 && (
                <div className="pt-5 border-t border-slate-100 space-y-4">
                  <h3 className="text-sm font-semibold text-[#0F172A]">
                    Client Reviews
                  </h3>
                  <div className="space-y-4">
                    {creator.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="pb-4 border-b border-slate-100 last:border-b-0 last:pb-0 space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-[#0F172A]">
                            {review.author} ·{' '}
                            <span className="font-normal text-slate-500">
                              {review.role}, {review.company}
                            </span>
                          </span>
                          <span className="inline-flex items-center gap-1 font-semibold text-[#0F172A] tabular-nums">
                            <Star
                              className="w-3.5 h-3.5 text-amber-500 fill-amber-500"
                              aria-hidden="true"
                            />
                            {review.rating.toFixed(1)}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          “{review.comment}”
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>

        {/* Right Sticky Purchase / Inquiry Module */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
            <div className="pb-5 border-b border-slate-100">
              <p className="text-xs font-medium text-slate-500 mb-1">
                Fixed-Scope Package Rate
              </p>
              <p className="text-3xl font-bold text-[#0F172A] tabular-nums">
                {formatCurrency(service.price)}
              </p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {service.shortDescription}
            </p>

            <div className="grid grid-cols-2 gap-3 py-4 border-y border-slate-100 text-sm">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#6D28D9] shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-slate-500">Est. Delivery</p>
                  <p className="font-semibold text-[#0F172A] tabular-nums">
                    {service.deliveryDays} days
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw
                  className="w-4 h-4 text-[#6D28D9] shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs text-slate-500">Revisions</p>
                  <p className="font-semibold text-[#0F172A] tabular-nums">
                    {service.revisions} rounds
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to={`/inquiry?serviceId=${encodeURIComponent(service.id)}`}
                className="flex items-center justify-center w-full px-5 py-3 text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-lg transition-colors"
              >
                Send Inquiry
              </Link>

              <button
                type="button"
                onClick={handleToggleWishlist}
                aria-pressed={saved}
                className={`flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold rounded-lg border transition-colors ${
                  saved
                    ? 'bg-[#F4F3FF] border-[#6D28D9] text-[#6D28D9]'
                    : 'bg-white border-slate-200 text-[#0F172A] hover:bg-slate-50'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${saved ? 'fill-current' : ''}`}
                  aria-hidden="true"
                />
                <span>{saved ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
              </button>
            </div>

            {creator && (
              <p className="text-xs text-slate-500 text-center">
                Typical response time from {creator.name}:{' '}
                <span className="font-medium text-[#0F172A]">
                  {creator.responseTime}
                </span>
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
