import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Users } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useApp } from '../context/AppContext';
import { SearchBar } from '../components/SearchBar';
import { CreatorCard } from '../components/CreatorCard';
import { EmptyState } from '../components/EmptyState';

type CreatorSort = 'rating' | 'experience' | 'projects';

export function ExploreCreators() {
  const { creators } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '');
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') ?? 'All'
  );
  const [minExperience, setMinExperience] = useState<number>(0);
  const [sortBy, setSortBy] = useState<CreatorSort>('rating');

  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    if (q !== null) setSearchQuery(q);
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  const filteredCreators = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const matched = creators.filter((creator) => {
      const matchesCategory =
        selectedCategory === 'All' || creator.primaryCategory === selectedCategory;

      const matchesExperience = creator.experienceYears >= minExperience;

      const matchesQuery =
        !query ||
        creator.name.toLowerCase().includes(query) ||
        creator.title.toLowerCase().includes(query) ||
        creator.location.toLowerCase().includes(query) ||
        creator.skills.some((skill) => skill.toLowerCase().includes(query)) ||
        creator.bio.toLowerCase().includes(query);

      return matchesCategory && matchesExperience && matchesQuery;
    });

    return [...matched].sort((a, b) => {
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (sortBy === 'projects') return b.completedProjects - a.completedProjects;
      return b.rating - a.rating || b.reviewCount - a.reviewCount;
    });
  }, [creators, searchQuery, selectedCategory, minExperience, sortBy]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setMinExperience(0);
    setSortBy('rating');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      {/* Header */}
      <div className="max-w-2xl mb-8">
        <p className="text-xs font-semibold text-[#6D28D9] mb-1.5">
          Creator Directory
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mb-2">
          Explore Independent Creators
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Browse vetted designers, developers, filmmakers, and strategists by
          specialty, technical skills, and verified client ratings.
        </p>
      </div>

      {/* Search & Controls Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 mb-8 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-6">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search creators by name, skill (e.g. Figma, React, DaVinci)..."
              ariaLabel="Search creators"
            />
          </div>

          <div className="lg:col-span-3">
            <label htmlFor="creator-exp-filter" className="sr-only">
              Minimum experience
            </label>
            <select
              id="creator-exp-filter"
              value={minExperience}
              onChange={(e) => setMinExperience(Number(e.target.value))}
              className="w-full px-3.5 py-3 text-sm rounded-xl border border-slate-200 bg-white text-[#0F172A] focus:border-[#6D28D9] focus:outline-none"
            >
              <option value={0}>Any Experience Level</option>
              <option value={6}>6+ Years Experience</option>
              <option value={8}>8+ Years Experience</option>
              <option value={10}>10+ Years Experience</option>
            </select>
          </div>

          <div className="lg:col-span-3">
            <label htmlFor="creator-sort" className="sr-only">
              Sort creators
            </label>
            <select
              id="creator-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as CreatorSort)}
              className="w-full px-3.5 py-3 text-sm rounded-xl border border-slate-200 bg-white text-[#0F172A] focus:border-[#6D28D9] focus:outline-none"
            >
              <option value="rating">Sort: Highest Rated</option>
              <option value="experience">Sort: Most Experienced</option>
              <option value="projects">Sort: Most Completed Projects</option>
            </select>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedCategory === 'All'
                ? 'bg-[#6D28D9] text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Disciplines
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.name)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === category.name
                  ? 'bg-[#6D28D9] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between gap-4 mb-6 text-sm text-slate-600">
        <p className="tabular-nums">
          Showing <span className="font-semibold text-[#0F172A]">{filteredCreators.length}</span>{' '}
          {filteredCreators.length === 1 ? 'creator' : 'creators'}
          {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
        </p>
        {(searchQuery || selectedCategory !== 'All' || minExperience > 0) && (
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-semibold text-[#6D28D9] hover:text-[#5B21B6]"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Creators Grid */}
      {filteredCreators.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Users className="w-6 h-6" aria-hidden="true" />}
          title="No creators match those filters"
          description="Try clearing your search keyword or switching to all creative disciplines to see every available specialist."
          actionLabel="Reset Creator Filters"
          onAction={handleReset}
        />
      )}
    </div>
  );
}
