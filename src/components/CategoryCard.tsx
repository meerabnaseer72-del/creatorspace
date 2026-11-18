import { Link } from 'react-router-dom';
import {
  PenTool,
  Code2,
  Layout,
  TrendingUp,
  FileText,
  Film,
  Camera,
  Compass,
  ArrowUpRight,
} from 'lucide-react';
import { CategoryInfo } from '../types/marketplace';

const ICON_MAP = {
  PenTool,
  Code2,
  Layout,
  TrendingUp,
  FileText,
  Film,
  Camera,
  Compass,
};

interface CategoryCardProps {
  category: CategoryInfo;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = ICON_MAP[category.iconName];

  return (
    <Link
      to={`/services?category=${encodeURIComponent(category.name)}`}
      className="group block bg-white border border-slate-200 hover:border-[#6D28D9]/50 rounded-2xl p-5 transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[#6D28D9]"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#F4F3FF] text-[#6D28D9] flex items-center justify-center shrink-0 group-hover:bg-[#6D28D9] group-hover:text-white transition-colors duration-150">
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
        <ArrowUpRight
          className="w-4 h-4 text-slate-400 group-hover:text-[#6D28D9] transition-colors shrink-0"
          aria-hidden="true"
        />
      </div>
      <h3 className="text-base font-semibold text-[#0F172A] mb-1.5 group-hover:text-[#6D28D9] transition-colors">
        {category.name}
      </h3>
      <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
        {category.description}
      </p>
      <div className="text-xs font-medium text-slate-500 tabular-nums">
        {category.serviceCount} curated packages
      </div>
    </Link>
  );
}
