import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-[calc(100vw-2.5rem)] sm:w-auto pointer-events-none"
    >
      {toasts.map((toast) => {
        const Icon =
          toast.tone === 'success'
            ? CheckCircle2
            : toast.tone === 'warning'
              ? AlertCircle
              : Info;

        const accentColor =
          toast.tone === 'success'
            ? 'text-emerald-400'
            : toast.tone === 'warning'
              ? 'text-amber-300'
              : 'text-[#C4B5FD]';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center justify-between gap-3 rounded-xl bg-[#0F172A] text-white px-4 py-3 shadow-lg border border-slate-700/80 text-sm"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Icon className={`w-4 h-4 shrink-0 ${accentColor}`} aria-hidden="true" />
              <span className="truncate font-medium">{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
              className="text-slate-400 hover:text-white transition-colors p-1 rounded focus-visible:outline-2 focus-visible:outline-[#7C3AED]"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
