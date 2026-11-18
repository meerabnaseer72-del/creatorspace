import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Briefcase } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SearchBar } from '../components/SearchBar';
import { ServiceCard } from '../components/ServiceCard';
import {
  FilterSidebar,
  PriceRangeFilter,
  ServiceSortOption,
} from '../components/FilterSidebar';
import { EmptyState } from '../components/EmptyState';

export function ExploreServices() {
  const { services, getCreatorById } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '');
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') ?? 'All'
  );
  const [priceRange, setPriceRange] = useState<PriceRangeFilter>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<ServiceSortOption>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    if (q !== null) setSearchQuery(q);
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  const activeServices = useMemo(
    () => services.filter((service) => service.status === 'Active'),
    [services]
  );

  const filteredServices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const matched = activeServices.filter((service) => {
      const creator = getCreatorById(service.creatorId);

      const matchesCategory =
        selectedCategory === 'All' || service.category === selectedCategory;

      const matchesPrice =
        priceRange === 'all' ||
        (priceRange === 'under-1000' && service.price < 1000) ||
        (priceRange === '1000-2000' &&
          service.price >= 1000 &&
          service.price <= 2000) ||
        (priceRange === 'over-2000' && service.price > 2000);

      const matchesRating = service.rating >= minRating;

      const matchesQuery =
        !query ||
        service.title.toLowerCase().includes(query) ||
        service.shortDescription.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        (creator?.name.toLowerCase().includes(query) ?? false);

      return matchesCategory && matchesPrice && matchesRating && matchesQuery;
    });

    return [...matched].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating-desc') {
        return b.rating - a.rating || b.reviewCount - a.reviewCount;
      }
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating;
    });
  }, [
    activeServices,
    searchQuery,
    selectedCategory,
    priceRange,
    minRating,
    sortBy,
    getCreatorById,
  ]);

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (priceRange !== 'all' ? 1 : 0) +
    (minRating > 0 ? 1 : 0);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange('all');
    setMinRating(0);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      {/* Header */}
      <div className="max-w-2xl mb-8">
        <p className="text-xs font-semibold text-[#6D28D9] mb-1.5">
          Services Marketplace
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mb-2">
          Explore Creative Services
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Fixed-scope creative packages with transparent pricing, turnaround
          schedules, and itemized deliverables.
        </p>
      </div>

      {/* Top Search & Sort Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        <div className="flex-1 max-w-xl">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search services by keyword, category, or creator..."
            ariaLabel="Search services"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#0F172A] bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
          >
            <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
            <span>
              Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
            </span>
          </button>

          <label htmlFor="service-sort-select" className="sr-only">
            Sort services
          </label>
          <select
            id="service-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as ServiceSortOption)}
            className="px-4 py-3 text-sm rounded-xl border border-slate-200 bg-white text-[#0F172A] focus:border-[#6D28D9] focus:outline-none"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Filter Sidebar */}
        <div
          className={`lg:col-span-3 ${
            mobileFiltersOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <FilterSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={(cat) => setSelectedCategory(cat)}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            minRating={minRating}
            onMinRatingChange={setMinRating}
            onResetFilters={handleResetFilters}
            activeFilterCount={activeFilterCount}
          />
        </div>

        {/* Service Results */}
        <div className="lg:col-span-9 space-y-6">
          <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
            <p className="tabular-nums">
              Showing{' '}
              <span className="font-semibold text-[#0F172A]">
                {filteredServices.length}
              </span>{' '}
              {filteredServices.length === 1 ? 'service' : 'services'}
              {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
            </p>
            {(searchQuery || activeFilterCount > 0) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-semibold text-[#6D28D9] hover:text-[#5B21B6]"
              >
                Clear all filters
              </button>
            )}
          </div>

          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Briefcase className="w-6 h-6" aria-hidden="true" />}
              title="No services match your current filters"
              description="Try adjusting your budget range, clearing the search keyword, or browsing all creative categories."
              actionLabel="Reset All Filters"
              onAction={handleResetFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
}
