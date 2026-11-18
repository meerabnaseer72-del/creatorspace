import { CATEGORIES } from '../data/categories';

export type PriceRangeFilter = 'all' | 'under-1000' | '1000-2000' | 'over-2000';
export type ServiceSortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc';

interface FilterSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: PriceRangeFilter;
  onPriceRangeChange: (range: PriceRangeFilter) => void;
  minRating: number;
  onMinRatingChange: (rating: number) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
}

const PRICE_OPTIONS: { value: PriceRangeFilter; label: string }[] = [
  { value: 'all', label: 'All Budgets' },
  { value: 'under-1000', label: 'Under $1,000' },
  { value: '1000-2000', label: '$1,000 – $2,000' },
  { value: 'over-2000', label: '$2,000+' },
];

const RATING_OPTIONS = [
  { value: 0, label: 'Any Rating' },
  { value: 4.8, label: '4.8+ Stars' },
  { value: 4.9, label: '4.9+ Stars' },
];

export function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  minRating,
  onMinRatingChange,
  onResetFilters,
  activeFilterCount,
}: FilterSidebarProps) {
  return (
    <aside className="bg-white border border-slate-200 rounded-2xl p-5 space-y-6">
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-[#0F172A]">Filters</h2>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-medium text-[#6D28D9] hover:text-[#5B21B6] transition-colors"
          >
            Reset ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Category Selection */}
      <div>
        <h3 className="text-xs font-semibold text-slate-500 mb-2.5">Category</h3>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onCategoryChange('All')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
              selectedCategory === 'All'
                ? 'bg-[#F4F3FF] text-[#6D28D9] font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>All Categories</span>
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategoryChange(category.name)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                selectedCategory === category.name
                  ? 'bg-[#F4F3FF] text-[#6D28D9] font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="pt-4 border-t border-slate-100">
        <h3 className="text-xs font-semibold text-slate-500 mb-2.5">Price Range</h3>
        <div className="space-y-1">
          {PRICE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onPriceRangeChange(option.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors tabular-nums ${
                priceRange === option.value
                  ? 'bg-[#F4F3FF] text-[#6D28D9] font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="pt-4 border-t border-slate-100">
        <h3 className="text-xs font-semibold text-slate-500 mb-2.5">Minimum Rating</h3>
        <div className="space-y-1">
          {RATING_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onMinRatingChange(option.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors tabular-nums ${
                minRating === option.value
                  ? 'bg-[#F4F3FF] text-[#6D28D9] font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
