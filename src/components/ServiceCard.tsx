import { Link } from 'react-router-dom';
import { Heart, Star, ArrowRight } from 'lucide-react';
import { Service } from '../types/marketplace';
import { useApp } from '../context/AppContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/formatters';
import { SafeImage } from './SafeImage';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { getCreatorById, showToast } = useApp();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const creator = getCreatorById(service.creatorId);
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
    <article className="group bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col transition-all duration-150 hover:-translate-y-0.5 hover:border-slate-300">
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <Link
          to={`/services/${service.id}`}
          className="block w-full h-full focus-visible:outline-2 focus-visible:outline-[#6D28D9]"
        >
          <SafeImage
            src={service.image}
            alt={service.title}
            fallbackTitle={service.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={saved ? `Remove ${service.title} from wishlist` : `Save ${service.title} to wishlist`}
          aria-pressed={saved}
          className={`absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center border transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#6D28D9] ${
            saved
              ? 'bg-[#6D28D9] border-[#6D28D9] text-white'
              : 'bg-white/95 border-slate-200 text-slate-700 hover:text-[#6D28D9] hover:border-[#6D28D9]/40'
          }`}
        >
          <Heart
            className={`w-4 h-4 ${saved ? 'fill-current' : ''}`}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {/* Zero-pill clean metadata kicker */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
          <span className="text-[#6D28D9]">{service.category}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{service.deliveryDays} days delivery</span>
        </div>

        <h3 className="text-base font-semibold text-[#0F172A] leading-snug mb-2 line-clamp-2">
          <Link
            to={`/services/${service.id}`}
            className="hover:text-[#6D28D9] transition-colors"
          >
            {service.title}
          </Link>
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4 flex-1">
          {service.shortDescription}
        </p>

        {/* Creator & rating row */}
        <div className="flex items-center justify-between gap-3 py-3 border-t border-slate-100 text-xs">
          {creator ? (
            <Link
              to={`/creators/${creator.id}`}
              className="flex items-center gap-2 min-w-0 text-slate-700 hover:text-[#6D28D9] transition-colors"
            >
              <SafeImage
                src={creator.avatar}
                alt={creator.name}
                fallbackTitle={creator.name}
                className="w-6 h-6 rounded-full object-cover shrink-0 border border-slate-200"
              />
              <span className="font-medium truncate">{creator.name}</span>
            </Link>
          ) : (
            <span className="text-slate-500">CreatorSpace Studio</span>
          )}

          <div className="flex items-center gap-1 text-slate-700 shrink-0 tabular-nums">
            <Star
              className="w-3.5 h-3.5 text-amber-500 fill-amber-500"
              aria-hidden="true"
            />
            <span className="font-semibold">{service.rating.toFixed(1)}</span>
            <span className="text-slate-400">({service.reviewCount})</span>
          </div>
        </div>

        {/* Price & Action Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <span className="block text-[11px] text-slate-500">Starting at</span>
            <span className="text-base font-bold text-[#0F172A] tabular-nums">
              {formatCurrency(service.price)}
            </span>
          </div>

          <Link
            to={`/services/${service.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0F172A] bg-[#F4F3FF] hover:bg-[#6D28D9] hover:text-white rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
