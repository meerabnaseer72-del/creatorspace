import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/formatters';
import { SafeImage } from '../components/SafeImage';
import { EmptyState } from '../components/EmptyState';

export function Wishlist() {
  const { services, getCreatorById, showToast } = useApp();
  const { wishlistIds, removeFromWishlist, clearWishlist } = useWishlist();

  const savedServices = services.filter((service) =>
    wishlistIds.includes(service.id)
  );

  const estimatedTotal = savedServices.reduce((sum, s) => sum + s.price, 0);

  const handleRemove = (id: string, title: string) => {
    removeFromWishlist(id);
    showToast(`Removed "${title}" from wishlist.`);
  };

  const handleClearAll = () => {
    clearWishlist();
    showToast('Cleared all saved services from wishlist.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div>
          <p className="text-xs font-semibold text-[#6D28D9] mb-1.5">
            Saved Shortlist
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Your Saved Services
          </h1>
          <p className="text-sm text-slate-600 mt-1.5">
            Compare shortlisted creative packages before sending a project brief.
          </p>
        </div>

        {savedServices.length > 0 && (
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-sm text-slate-600 tabular-nums">
              Estimated shortlist total:{' '}
              <span className="font-bold text-[#0F172A]">
                {formatCurrency(estimatedTotal)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {savedServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedServices.map((service) => {
            const creator = getCreatorById(service.creatorId);
            return (
              <article
                key={service.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col"
              >
                <Link
                  to={`/services/${service.id}`}
                  className="block aspect-[4/3] bg-slate-100 overflow-hidden"
                >
                  <SafeImage
                    src={service.image}
                    alt={service.title}
                    fallbackTitle={service.title}
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-200"
                  />
                </Link>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-medium text-[#6D28D9]">
                      {service.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      {service.deliveryDays} days delivery
                    </span>
                  </div>

                  <h2 className="text-base font-semibold text-[#0F172A] mb-2">
                    <Link
                      to={`/services/${service.id}`}
                      className="hover:text-[#6D28D9] transition-colors"
                    >
                      {service.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-slate-500 mb-4">
                    By {creator?.name ?? 'CreatorSpace Studio'}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <span className="text-lg font-bold text-[#0F172A] tabular-nums">
                      {formatCurrency(service.price)}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleRemove(service.id, service.title)}
                        aria-label={`Remove ${service.title} from wishlist`}
                        className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg border border-slate-200 transition-colors"
                      >
                        Remove
                      </button>
                      <Link
                        to={`/services/${service.id}`}
                        className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-lg transition-colors whitespace-nowrap"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={<Heart className="w-6 h-6" aria-hidden="true" />}
          title="Your wishlist is empty"
          description="Save creative services while browsing the marketplace to compare pricing, timelines, and deliverables side by side."
          actionLabel="Explore Creative Services"
          actionTo="/services"
        />
      )}
    </div>
  );
}
