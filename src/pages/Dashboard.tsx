import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  PauseCircle,
  LayoutDashboard,
  Briefcase,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ClientInquiry, Service } from '../types/marketplace';
import { formatCurrency, formatShortDate } from '../utils/formatters';
import { DashboardStats } from '../components/DashboardStats';
import { ServiceFormModal } from '../components/ServiceFormModal';
import { SearchBar } from '../components/SearchBar';
import { EmptyState } from '../components/EmptyState';

type DashboardTab = 'overview' | 'services' | 'inquiries';

export function Dashboard() {
  const {
    services,
    inquiries,
    getCreatorById,
    deleteService,
    toggleServiceStatus,
    updateInquiryStatus,
    deleteInquiry,
  } = useApp();

  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as DashboardTab) || 'overview';

  const [activeTab, setActiveTab] = useState<DashboardTab>(
    ['overview', 'services', 'inquiries'].includes(initialTab)
      ? initialTab
      : 'overview'
  );
  const [serviceSearch, setServiceSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(
    searchParams.get('action') === 'new'
  );
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [confirmDeleteServiceId, setConfirmDeleteServiceId] = useState<
    string | null
  >(null);
  const [confirmDeleteInquiryId, setConfirmDeleteInquiryId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const tabParam = searchParams.get('tab') as DashboardTab | null;
    if (tabParam && ['overview', 'services', 'inquiries'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
    if (searchParams.get('action') === 'new') {
      setEditingService(null);
      setModalOpen(true);
    }
  }, [searchParams]);

  const activeServicesCount = useMemo(
    () => services.filter((s) => s.status === 'Active').length,
    [services]
  );

  const averagePrice = useMemo(() => {
    if (services.length === 0) return 0;
    const total = services.reduce((sum, s) => sum + s.price, 0);
    return Math.round(total / services.length);
  }, [services]);

  const filteredServices = useMemo(() => {
    const q = serviceSearch.trim().toLowerCase();
    if (!q) return services;
    return services.filter((s) => {
      const creatorName = getCreatorById(s.creatorId)?.name.toLowerCase() ?? '';
      return (
        s.title.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        creatorName.includes(q)
      );
    });
  }, [services, serviceSearch, getCreatorById]);

  const handleOpenAddModal = () => {
    setEditingService(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (service: Service) => {
    setEditingService(service);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingService(null);
    if (searchParams.get('action') === 'new') {
      const next = new URLSearchParams(searchParams);
      next.delete('action');
      setSearchParams(next);
    }
  };

  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab);
    const next = new URLSearchParams(searchParams);
    next.set('tab', tab);
    setSearchParams(next);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
        <div>
          <p className="text-xs font-semibold text-[#6D28D9] mb-1">
            Creator Studio Workspace
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            Creator Dashboard
          </h1>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Dashboard Sidebar */}
        <aside className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-3">
          <nav aria-label="Dashboard sections" className="space-y-1">
            <button
              type="button"
              onClick={() => handleTabChange('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#F4F3FF] text-[#6D28D9]'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Overview</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('services')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'services'
                  ? 'bg-[#F4F3FF] text-[#6D28D9]'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Manage Services</span>
              </span>
              <span className="text-xs tabular-nums text-slate-500">
                {services.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('inquiries')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'inquiries'
                  ? 'bg-[#F4F3FF] text-[#6D28D9]'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Client Inquiries</span>
              </span>
              <span className="text-xs tabular-nums text-slate-500">
                {inquiries.length}
              </span>
            </button>
          </nav>
        </aside>

        {/* Main Workspace */}
        <div className="lg:col-span-9 space-y-8">
          <DashboardStats
            totalServices={services.length}
            activeServices={activeServicesCount}
            totalInquiries={inquiries.length}
            averagePrice={averagePrice}
          />

          {/* Services Management Section */}
          {(activeTab === 'overview' || activeTab === 'services') && (
            <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#0F172A]">
                    Service Management
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Create, update, pause, or remove service packages. Changes
                    persist locally and update the live marketplace.
                  </p>
                </div>

                <div className="w-full sm:w-64">
                  <SearchBar
                    value={serviceSearch}
                    onChange={setServiceSearch}
                    placeholder="Filter services..."
                    ariaLabel="Filter dashboard services"
                  />
                </div>
              </div>

              {filteredServices.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500">
                        <th className="py-3.5 px-5">Service</th>
                        <th className="py-3.5 px-4">Category</th>
                        <th className="py-3.5 px-4 text-right">Price</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {filteredServices.map((service) => {
                        const creator = getCreatorById(service.creatorId);
                        const isConfirmingDelete =
                          confirmDeleteServiceId === service.id;

                        return (
                          <tr
                            key={service.id}
                            className="hover:bg-slate-50/70 transition-colors"
                          >
                            <td className="py-3.5 px-5 max-w-xs">
                              <div className="font-semibold text-[#0F172A] truncate">
                                <Link
                                  to={`/services/${service.id}`}
                                  className="hover:text-[#6D28D9] inline-flex items-center gap-1"
                                >
                                  <span className="truncate">{service.title}</span>
                                  <ExternalLink
                                    className="w-3 h-3 text-slate-400 shrink-0"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </div>
                              <div className="text-xs text-slate-500 truncate mt-0.5">
                                {creator?.name ?? 'Studio'} ·{' '}
                                <span className="tabular-nums">
                                  {service.deliveryDays}d delivery
                                </span>
                              </div>
                            </td>

                            <td className="py-3.5 px-4 text-xs font-medium text-slate-700 whitespace-nowrap">
                              {service.category}
                            </td>

                            <td className="py-3.5 px-4 text-right font-semibold text-[#0F172A] tabular-nums whitespace-nowrap">
                              {formatCurrency(service.price)}
                            </td>

                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => toggleServiceStatus(service.id)}
                                title="Toggle Active / Paused visibility"
                                className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border transition-colors ${
                                  service.status === 'Active'
                                    ? 'text-emerald-700 bg-emerald-50/60 border-emerald-200 hover:bg-emerald-100/60'
                                    : 'text-slate-600 bg-slate-100 border-slate-200 hover:bg-slate-200'
                                }`}
                              >
                                {service.status === 'Active' ? (
                                  <CheckCircle2
                                    className="w-3.5 h-3.5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PauseCircle
                                    className="w-3.5 h-3.5"
                                    aria-hidden="true"
                                  />
                                )}
                                <span>{service.status}</span>
                              </button>
                            </td>

                            <td className="py-3.5 px-5 text-right whitespace-nowrap">
                              {isConfirmingDelete ? (
                                <div className="inline-flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      deleteService(service.id);
                                      setConfirmDeleteServiceId(null);
                                    }}
                                    className="px-2.5 py-1 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-md"
                                  >
                                    Confirm Delete
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setConfirmDeleteServiceId(null)}
                                    className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <div className="inline-flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditModal(service)}
                                    aria-label={`Edit ${service.title}`}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-[#6D28D9] hover:bg-[#F4F3FF] rounded-lg transition-colors"
                                  >
                                    <Pencil
                                      className="w-3.5 h-3.5"
                                      aria-hidden="true"
                                    />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setConfirmDeleteServiceId(service.id)
                                    }
                                    aria-label={`Delete ${service.title}`}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                                  >
                                    <Trash2
                                      className="w-3.5 h-3.5"
                                      aria-hidden="true"
                                    />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8">
                  <EmptyState
                    title={
                      serviceSearch
                        ? 'No matching services found'
                        : 'No services listed yet'
                    }
                    description={
                      serviceSearch
                        ? 'Clear your search filter to inspect all listed services.'
                        : 'Publish your first fixed-scope creative package to appear in the CreatorSpace marketplace.'
                    }
                    actionLabel={
                      serviceSearch ? 'Clear Filter' : 'Add New Service'
                    }
                    onAction={
                      serviceSearch
                        ? () => setServiceSearch('')
                        : handleOpenAddModal
                    }
                  />
                </div>
              )}
            </section>
          )}

          {/* Client Inquiries Section */}
          {(activeTab === 'overview' || activeTab === 'inquiries') && (
            <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#0F172A]">
                    Client Inquiry Overview
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Review incoming project briefs, update response status, or
                    archive completed threads.
                  </p>
                </div>

                <Link
                  to="/inquiry"
                  className="text-xs font-semibold text-[#6D28D9] hover:text-[#5B21B6] whitespace-nowrap"
                >
                  Open Inquiry Form
                </Link>
              </div>

              {inquiries.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {inquiries.map((inq) => {
                    const isConfirming = confirmDeleteInquiryId === inq.id;
                    return (
                      <div key={inq.id} className="p-5 sm:p-6 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-1">
                              <span className="font-mono font-medium text-[#6D28D9]">
                                {inq.id}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>{inq.serviceTitle}</span>
                              <span aria-hidden="true">·</span>
                              <span>Assigned: {inq.creatorName}</span>
                            </div>
                            <h3 className="text-base font-semibold text-[#0F172A]">
                              {inq.projectTitle}
                            </h3>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <label
                              htmlFor={`inq-status-${inq.id}`}
                              className="sr-only"
                            >
                              Inquiry status
                            </label>
                            <select
                              id={`inq-status-${inq.id}`}
                              value={inq.status}
                              onChange={(e) =>
                                updateInquiryStatus(
                                  inq.id,
                                  e.target.value as ClientInquiry['status']
                                )
                              }
                              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white text-[#0F172A] focus:border-[#6D28D9] focus:outline-none"
                            >
                              <option value="New">Status: New</option>
                              <option value="In Review">Status: In Review</option>
                              <option value="Responded">Status: Responded</option>
                            </select>

                            {isConfirming ? (
                              <div className="inline-flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    deleteInquiry(inq.id);
                                    setConfirmDeleteInquiryId(null);
                                  }}
                                  className="px-2.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg"
                                >
                                  Remove
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteInquiryId(null)}
                                  className="px-2.5 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteInquiryId(inq.id)}
                                aria-label={`Delete inquiry ${inq.id}`}
                                className="p-2 text-slate-400 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" aria-hidden="true" />
                              </button>
                            )}
                          </div>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed">
                          {inq.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-1 tabular-nums">
                          <span>
                            Client:{' '}
                            <strong className="font-medium text-[#0F172A]">
                              {inq.clientName}
                            </strong>{' '}
                            ({inq.email})
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>Budget: {inq.budgetRange}</span>
                          <span aria-hidden="true">·</span>
                          <span>Deadline: {formatShortDate(inq.deadline)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8">
                  <EmptyState
                    icon={<Mail className="w-6 h-6" aria-hidden="true" />}
                    title="No client inquiries yet"
                    description="Submitted project briefs from the Client Inquiry page will appear here with budget and deadline details."
                    actionLabel="Submit a Test Inquiry"
                    actionTo="/inquiry"
                  />
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      <ServiceFormModal
        isOpen={modalOpen}
        editingService={editingService}
        onClose={handleCloseModal}
      />
    </div>
  );
}
