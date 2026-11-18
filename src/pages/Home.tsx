import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Clock, Layers } from 'lucide-react';
import { CATEGORIES, HERO_STUDIO_IMAGE } from '../data/categories';
import { TESTIMONIALS } from '../data/testimonials';
import { useApp } from '../context/AppContext';
import { SearchBar } from '../components/SearchBar';
import { CategoryCard } from '../components/CategoryCard';
import { ServiceCard } from '../components/ServiceCard';
import { CreatorCard } from '../components/CreatorCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { SafeImage } from '../components/SafeImage';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState<'services' | 'creators'>('services');
  const navigate = useNavigate();
  const { services, creators } = useApp();

  const trendingServices = services
    .filter((service) => service.status === 'Active')
    .slice(0, 6);

  const featuredCreators = creators.slice(0, 4);

  const handleHeroSearch = (query: string) => {
    const trimmed = query.trim();
    const targetPath = searchScope === 'services' ? '/services' : '/creators';
    navigate(trimmed ? `${targetPath}?q=${encodeURIComponent(trimmed)}` : targetPath);
  };

  return (
    <div>
      {/* Hero Split Section */}
      <section className="bg-[#0B1120] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <p className="text-xs font-semibold tracking-wide text-[#C4B5FD]">
                Curated Creative Services Marketplace
              </p>

              <h1 className="text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-white text-balance">
                Hire vetted creative talent with transparent fixed-scope packages.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Connect directly with independent brand directors, UI/UX designers,
                full-stack engineers, filmmakers, and writers. Compare real portfolios
                and launch projects without agency overhead.
              </p>

              {/* Search Scope + Bar */}
              <div className="space-y-2.5 max-w-xl pt-1">
                <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-slate-800/80 border border-slate-700">
                  <button
                    type="button"
                    onClick={() => setSearchScope('services')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      searchScope === 'services'
                        ? 'bg-[#6D28D9] text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Search Services
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchScope('creators')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      searchScope === 'creators'
                        ? 'bg-[#6D28D9] text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Search Creators
                  </button>
                </div>

                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSubmit={handleHeroSearch}
                  placeholder={
                    searchScope === 'services'
                      ? 'Search brand identity, React web app, video edit...'
                      : 'Search creator name, skill, or location...'
                  }
                  buttonLabel="Search"
                  darkSurface
                />
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A78BFA]"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-200 border border-slate-700 hover:border-slate-500 hover:text-white rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Become a Creator</span>
                </Link>
              </div>
            </div>

            {/* Right Column Editorial Studio Visual */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 h-full min-h-[280px] sm:min-h-[360px]">
                <SafeImage
                  src={HERO_STUDIO_IMAGE}
                  alt="Designers collaborating inside a sunlit modern creative studio"
                  fallbackTitle="CreatorSpace Creative Studio"
                  className="w-full h-full lg:h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1120]/90 via-[#0B1120]/45 to-transparent p-6">
                  <p className="text-xs font-medium text-[#C4B5FD] mb-1">
                    Featured Studio Deliverable
                  </p>
                  <p className="text-sm font-semibold text-white">
                    Brand Systems · Product UI/UX · Full-Stack Web Engineering
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width 4-column KPI strip below hero split */}
          <div className="mt-12 pt-10 border-t border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                1,400+
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Vetted independent creators
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                98.4%
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                On-time milestone delivery rate
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                4.9 / 5.0
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Verified client satisfaction score
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                Under 4h
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Median creator inquiry response
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Service Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-[#6D28D9] mb-1.5">
              Service Disciplines
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              Popular Creative Categories
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6D28D9] hover:text-[#5B21B6] transition-colors whitespace-nowrap"
          >
            <span>View all categories</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Trending Services */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold text-[#6D28D9] mb-1.5">
                Ready-to-Book Packages
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                Trending Creative Services
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6D28D9] hover:text-[#5B21B6] transition-colors whitespace-nowrap"
            >
              <span>Browse marketplace</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Creators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-[#6D28D9] mb-1.5">
              Independent Specialists
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              Featured Creators
            </h2>
          </div>
          <Link
            to="/creators"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6D28D9] hover:text-[#5B21B6] transition-colors whitespace-nowrap"
          >
            <span>Explore all creators</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </section>

      {/* How It Works & Platform Benefits */}
      <section className="bg-[#F4F3FF] border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 space-y-3">
              <p className="text-xs font-semibold text-[#6D28D9]">
                How CreatorSpace Works
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight text-balance">
                From discovery to delivered assets in three clear steps.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every service lists transparent pricing, concrete deliverables, and
                turnaround timelines before you send a single message.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
                <p className="text-sm font-bold text-[#6D28D9] tabular-nums">01.</p>
                <h3 className="text-base font-semibold text-[#0F172A]">
                  Compare Portfolios
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Filter creators and packages by discipline, budget, and delivery
                  speed. Save shortlisted options to your wishlist.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
                <p className="text-sm font-bold text-[#6D28D9] tabular-nums">02.</p>
                <h3 className="text-base font-semibold text-[#0F172A]">
                  Send a Project Brief
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Submit your project scope, target deadline, and budget directly to
                  your chosen creator with zero middleman markups.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
                <p className="text-sm font-bold text-[#6D28D9] tabular-nums">03.</p>
                <h3 className="text-base font-semibold text-[#0F172A]">
                  Ship Final Deliverables
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Collaborate through structured revision milestones and receive
                  organized, production-ready source files.
                </p>
              </div>
            </div>
          </div>

          {/* Platform Benefits Strip */}
          <div className="pt-10 border-t border-slate-200/80 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#6D28D9] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0F172A]">
                  Vetted Senior Specialists
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Every creator showcases verified client case studies, commercial
                  metrics, and peer-reviewed deliverables.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#6D28D9] flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0F172A]">
                  Itemized Deliverables
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Know exactly what files, revisions, and usage licenses are included
                  before commissioning work.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#6D28D9] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0F172A]">
                  Predictable Turnarounds
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Structured 5-to-16 day delivery sprints keep product launches and
                  campaigns on schedule.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mb-8">
          <p className="text-xs font-semibold text-[#6D28D9] mb-1.5">
            Client Outcomes
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            Trusted by product, brand, and creative leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Bottom Conversion Banner */}
        <div className="mt-14 bg-[#0B1120] text-white rounded-2xl p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-balance">
              Ready to launch your next brand, product, or campaign?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Submit a project brief in two minutes or open the Creator Dashboard to
              publish and manage your own service packages.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/inquiry"
              className="px-5 py-3 text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-lg transition-colors whitespace-nowrap"
            >
              Send Project Inquiry
            </Link>
            <Link
              to="/dashboard"
              className="px-5 py-3 text-sm font-semibold text-slate-200 border border-slate-700 hover:border-slate-500 hover:text-white rounded-lg transition-colors whitespace-nowrap"
            >
              Open Creator Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
