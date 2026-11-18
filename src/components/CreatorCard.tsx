import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { Creator } from '../types/marketplace';
import { SafeImage } from './SafeImage';

interface CreatorCardProps {
  creator: Creator;
}

export function CreatorCard({ creator }: CreatorCardProps) {
  const previewThumbnails = creator.portfolio.slice(0, 2);

  return (
    <article className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between transition-all duration-150 hover:-translate-y-0.5 hover:border-slate-300">
      <div>
        <div className="flex items-start gap-4 mb-4">
          <Link to={`/creators/${creator.id}`} className="shrink-0">
            <SafeImage
              src={creator.avatar}
              alt={creator.name}
              fallbackTitle={creator.name}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
            />
          </Link>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-[#0F172A] truncate">
              <Link
                to={`/creators/${creator.id}`}
                className="hover:text-[#6D28D9] transition-colors"
              >
                {creator.name}
              </Link>
            </h3>
            <p className="text-sm text-[#6D28D9] font-medium truncate mb-1">
              {creator.title}
            </p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 tabular-nums">
              <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
                <Star
                  className="w-3.5 h-3.5 text-amber-500 fill-amber-500"
                  aria-hidden="true"
                />
                {creator.rating.toFixed(1)} ({creator.reviewCount})
              </span>
              <span aria-hidden="true">·</span>
              <span>{creator.experienceYears} yrs exp</span>
              <span aria-hidden="true">·</span>
              <span>{creator.location}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
          {creator.bio}
        </p>

        {/* Clean unboxed skill line */}
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          {creator.skills.slice(0, 3).join(' · ')}
        </p>

        {/* Portfolio Preview Strip */}
        {previewThumbnails.length > 0 && (
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {previewThumbnails.map((project) => (
              <Link
                key={project.id}
                to={`/creators/${creator.id}`}
                className="block aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-100"
              >
                <SafeImage
                  src={project.image}
                  alt={project.title}
                  fallbackTitle={project.title}
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-200"
                />
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <span className="text-xs text-slate-500 tabular-nums">
          {creator.completedProjects} completed projects
        </span>
        <Link
          to={`/creators/${creator.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6D28D9] hover:text-[#5B21B6] transition-colors whitespace-nowrap shrink-0"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
