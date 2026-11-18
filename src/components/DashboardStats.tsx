import { formatCurrency } from '../utils/formatters';

interface DashboardStatsProps {
  totalServices: number;
  activeServices: number;
  totalInquiries: number;
  averagePrice: number;
}

export function DashboardStats({
  totalServices,
  activeServices,
  totalInquiries,
  averagePrice,
}: DashboardStatsProps) {
  const stats = [
    {
      label: 'Total Listed Services',
      value: String(totalServices),
      detail: 'Published across 8 categories',
    },
    {
      label: 'Active Packages',
      value: String(activeServices),
      detail: 'Visible in live marketplace',
    },
    {
      label: 'Client Inquiries',
      value: String(totalInquiries),
      detail: 'Submitted project briefs',
    },
    {
      label: 'Average Package Rate',
      value: formatCurrency(averagePrice),
      detail: 'Fixed-scope service average',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white border border-slate-200 rounded-2xl p-5"
        >
          <p className="text-xs font-medium text-slate-500 mb-2">{stat.label}</p>
          <p className="text-2xl font-bold text-[#0F172A] tabular-nums mb-1">
            {stat.value}
          </p>
          <p className="text-xs text-slate-500">{stat.detail}</p>
        </div>
      ))}
    </div>
  );
}
