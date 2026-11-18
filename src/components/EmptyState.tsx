import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
  onAction?: () => void;
  icon?: ReactNode;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl px-6 py-14 text-center max-w-xl mx-auto">
      <div className="w-12 h-12 rounded-xl bg-[#F4F3FF] text-[#6D28D9] flex items-center justify-center mx-auto mb-4">
        {icon || <Inbox className="w-6 h-6" aria-hidden="true" />}
      </div>
      <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-md mx-auto">
        {description}
      </p>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-lg transition-colors whitespace-nowrap"
        >
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionTo && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-lg transition-colors whitespace-nowrap"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
