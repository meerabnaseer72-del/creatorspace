import { Testimonial } from '../types/marketplace';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between gap-6">
      <blockquote className="text-sm text-slate-700 leading-relaxed">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="pt-4 border-t border-slate-100 space-y-1.5">
        <div className="text-sm font-semibold text-[#0F172A]">
          {testimonial.authorName}
        </div>
        <div className="text-xs text-slate-500">
          {testimonial.authorRole} · {testimonial.company}
        </div>
        <div className="text-xs font-medium text-[#6D28D9] tabular-nums pt-1">
          Outcome: {testimonial.outcomeMetric}
        </div>
      </figcaption>
    </figure>
  );
}
