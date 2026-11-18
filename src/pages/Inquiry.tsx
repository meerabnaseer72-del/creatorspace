import { useSearchParams, Link } from 'react-router-dom';
import { ShieldCheck, Clock, FileCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InquiryForm } from '../components/InquiryForm';
import { formatShortDate } from '../utils/formatters';

export function Inquiry() {
  const [searchParams] = useSearchParams();
  const preselectedServiceId = searchParams.get('serviceId') ?? '';
  const { inquiries } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="max-w-2xl mb-8">
        <p className="text-xs font-semibold text-[#6D28D9] mb-1.5">
          Project Brief Desk
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mb-2">
          Send a Client Inquiry
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Share your project goals, timeline, and budget range. Your brief is
          routed directly to the creator and tracked in the Creator Dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <InquiryForm preselectedServiceId={preselectedServiceId} />
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
            <h2 className="text-sm font-semibold text-[#0F172A]">
              What happens after you submit
            </h2>
            <ul className="space-y-4 text-xs text-slate-600">
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[#0F172A]">Fast Creator Review</p>
                  <p className="mt-0.5 leading-relaxed">
                    Independent specialists review your brief and confirm availability
                    within 1 business day.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FileCheck className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[#0F172A]">Milestone Alignment</p>
                  <p className="mt-0.5 leading-relaxed">
                    Receive a clear milestone schedule, revision rounds, and final
                    file formats before kickoff.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[#0F172A]">Persistent Brief Tracking</p>
                  <p className="mt-0.5 leading-relaxed">
                    Every submitted inquiry is saved locally and accessible in the
                    Creator Dashboard.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-[#0F172A]">
                Recent Submitted Inquiries
              </h2>
              <Link
                to="/dashboard?tab=inquiries"
                className="text-xs font-semibold text-[#6D28D9] hover:text-[#5B21B6]"
              >
                Manage
              </Link>
            </div>

            {inquiries.length > 0 ? (
              <ul className="divide-y divide-slate-100">
                {inquiries.slice(0, 4).map((inq) => (
                  <li key={inq.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-[#0F172A] truncate">
                        {inq.projectTitle}
                      </span>
                      <span className="font-mono text-[11px] text-slate-500 shrink-0">
                        {inq.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">
                      {inq.clientName} · {inq.creatorName} · Due{' '}
                      {formatShortDate(inq.deadline)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500">
                No inquiries submitted yet.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
