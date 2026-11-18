import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Star,
  Briefcase,
  ArrowLeft,
  X,
  Maximize2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PortfolioProject } from '../types/marketplace';
import { ServiceCard } from '../components/ServiceCard';
import { SafeImage } from '../components/SafeImage';
import { EmptyState } from '../components/EmptyState';

export function CreatorProfile() {
  const { id } = useParams<{ id: string }>();
  const { getCreatorById, getServicesByCreator } = useApp();
  const [lightboxProject, setLightboxProject] = useState<PortfolioProject | null>(
    null
  );

  const creator = id ? getCreatorById(id) : undefined;
  const creatorServices = creator
    ? getServicesByCreator(creator.id).filter((s) => s.status === 'Active')
    : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxProject(null);
      }
    };
    if (lightboxProject) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxProject]);

  if (!creator) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          title="Creator profile not found"
          description="This creator profile may have moved or does not exist in the directory."
          actionLabel="Browse All Creators"
          actionTo="/creators"
        />
      </div>
    );
  }

  const primaryServiceId = creatorServices[0]?.id ?? '';
  const inquiryHref = primaryServiceId
    ? `/inquiry?serviceId=${encodeURIComponent(primaryServiceId)}`
    : '/inquiry';

  return (
    <div className="pb-16">
      {/* Cover Section */}
      <div className={`bg-gradient-to-r ${creator.coverTone} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Link
            to="/creators"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Explore Creators</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <SafeImage
                src={creator.avatar}
                alt={creator.name}
                fallbackTitle={creator.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-white/20 shrink-0"
              />
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-[#C4B5FD]">
                  {creator.primaryCategory}
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {creator.name}
                </h1>
                <p className="text-sm sm:text-base text-slate-200">{creator.title}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-slate-300 tabular-nums">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C4B5FD]" aria-hidden="true" />
                    {creator.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Star
                      className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                      aria-hidden="true"
                    />
                    {creator.rating.toFixed(1)} ({creator.reviewCount} reviews)
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-[#C4B5FD]" aria-hidden="true" />
                    {creator.experienceYears} years experience · {creator.completedProjects} projects
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C4B5FD]" aria-hidden="true" />
                    Responds {creator.responseTime.toLowerCase()}
                  </span>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <Link
                to={inquiryHref}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-lg transition-colors whitespace-nowrap"
              >
                Send Inquiry
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* About & Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <section className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-4">
            <h2 className="text-lg font-bold text-[#0F172A]">About &amp; Approach</h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {creator.bio}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {creator.introduction}
            </p>
          </section>

          <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-5">
            <div>
              <h2 className="text-sm font-semibold text-[#0F172A] mb-3">
                Core Skills &amp; Expertise
              </h2>
              <ul className="space-y-2 text-sm text-slate-700">
                {creator.skills.map((skill) => (
                  <li
                    key={skill}
                    className="pb-2 border-b border-slate-100 last:border-b-0 last:pb-0"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-sm tabular-nums">
              <div>
                <p className="text-xs text-slate-500">Completed</p>
                <p className="font-bold text-[#0F172A] mt-0.5">
                  {creator.completedProjects} projects
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Experience</p>
                <p className="font-bold text-[#0F172A] mt-0.5">
                  {creator.experienceYears} years
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Portfolio Gallery */}
        <section className="space-y-5">
          <div>
            <p className="text-xs font-semibold text-[#6D28D9] mb-1">
              Selected Work Samples
            </p>
            <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
              Portfolio Gallery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {creator.portfolio.map((project) => (
              <article
                key={project.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => setLightboxProject(project)}
                  className="group relative aspect-[4/3] w-full bg-slate-100 overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-[#6D28D9]"
                >
                  <SafeImage
                    src={project.image}
                    alt={project.title}
                    fallbackTitle={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B1120]/80 text-white text-xs font-medium">
                    <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Inspect</span>
                  </span>
                </button>
                <div className="p-6 space-y-2.5">
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span className="font-medium text-[#6D28D9]">
                      {project.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{project.client}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{project.year}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0F172A]">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {project.summary}
                  </p>
                  <p className="text-xs font-medium text-[#0F172A] pt-2 border-t border-slate-100">
                    Impact: {project.outcome}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Services Offered */}
        <section className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#6D28D9] mb-1">
                Bookable Packages
              </p>
              <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
                Services Offered by {creator.name}
              </h2>
            </div>
          </div>

          {creatorServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creatorServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No active services listed right now"
              description={`${creator.name} currently has no active fixed-scope packages, but you can still send a custom project inquiry.`}
              actionLabel="Send Custom Inquiry"
              actionTo="/inquiry"
            />
          )}
        </section>

        {/* Reviews */}
        <section className="space-y-5">
          <div>
            <p className="text-xs font-semibold text-[#6D28D9] mb-1">
              Client Feedback
            </p>
            <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
              Verified Ratings &amp; Reviews
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {creator.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1 text-sm font-semibold text-[#0F172A] tabular-nums">
                    <Star
                      className="w-4 h-4 text-amber-500 fill-amber-500"
                      aria-hidden="true"
                    />
                    <span>{review.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-slate-500">{review.date}</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  “{review.comment}”
                </p>
                <div className="pt-3 border-t border-slate-100 text-xs">
                  <p className="font-semibold text-[#0F172A]">{review.author}</p>
                  <p className="text-slate-500">
                    {review.role} · {review.company}
                    {review.serviceTitle ? ` · ${review.serviceTitle}` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {lightboxProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxProject.title}
          className="fixed inset-0 z-50 bg-[#0B1120]/90 flex items-center justify-center p-4"
          onClick={() => setLightboxProject(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">
                  {lightboxProject.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {lightboxProject.client} · {lightboxProject.year}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxProject(null)}
                aria-label="Close lightbox"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-[#0F172A]"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="bg-slate-100 max-h-[65vh] overflow-hidden">
              <SafeImage
                src={lightboxProject.image}
                alt={lightboxProject.title}
                fallbackTitle={lightboxProject.title}
                className="w-full h-full max-h-[65vh] object-contain mx-auto"
              />
            </div>
            <div className="px-6 py-4 bg-white text-sm text-slate-700 space-y-1">
              <p>{lightboxProject.summary}</p>
              <p className="text-xs font-semibold text-[#6D28D9]">
                Outcome: {lightboxProject.outcome}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
