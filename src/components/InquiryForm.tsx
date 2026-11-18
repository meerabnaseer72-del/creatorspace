import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ClientInquiry } from '../types/marketplace';
import { formatCurrency, formatShortDate, isValidEmail } from '../utils/formatters';

interface InquiryFormProps {
  preselectedServiceId?: string;
  onSuccess?: (inquiry: ClientInquiry) => void;
}

interface FormErrors {
  clientName?: string;
  email?: string;
  serviceId?: string;
  projectTitle?: string;
  description?: string;
  budgetRange?: string;
  deadline?: string;
}

const BUDGET_RANGES = [
  '$500 – $1,000',
  '$1,000 – $2,500',
  '$2,500 – $5,000',
  '$5,000 – $10,000',
  '$10,000+',
];

export function InquiryForm({ preselectedServiceId = '', onSuccess }: InquiryFormProps) {
  const { services, getCreatorById, addInquiry } = useApp();
  const activeServices = services.filter((s) => s.status === 'Active');

  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [serviceId, setServiceId] = useState(preselectedServiceId);
  const [projectTitle, setProjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [deadline, setDeadline] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedInquiry, setSubmittedInquiry] = useState<ClientInquiry | null>(null);

  useEffect(() => {
    if (preselectedServiceId) {
      setServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!clientName.trim() || clientName.trim().length < 2) {
      nextErrors.clientName = 'Please enter your full name (at least 2 characters).';
    }
    if (!email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!isValidEmail(email)) {
      nextErrors.email = 'Please enter a valid email address (e.g., name@company.com).';
    }
    if (!serviceId) {
      nextErrors.serviceId = 'Please select a creative service package.';
    }
    if (!projectTitle.trim() || projectTitle.trim().length < 4) {
      nextErrors.projectTitle = 'Please provide a concise project title (at least 4 characters).';
    }
    if (!description.trim() || description.trim().length < 20) {
      nextErrors.description =
        'Please describe your project goals and scope (at least 20 characters).';
    }
    if (!budgetRange) {
      nextErrors.budgetRange = 'Please select an estimated budget range.';
    }
    if (!deadline) {
      nextErrors.deadline = 'Please select your target deadline.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const created = addInquiry({
      clientName,
      email,
      serviceId,
      projectTitle,
      description,
      budgetRange,
      deadline,
    });

    setSubmittedInquiry(created);
    setClientName('');
    setEmail('');
    setProjectTitle('');
    setDescription('');
    setBudgetRange('');
    setDeadline('');
    setErrors({});

    if (onSuccess) {
      onSuccess(created);
    }
  };

  const clearFieldError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (submittedInquiry) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-7 sm:p-8 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-medium text-emerald-700 mb-1 tabular-nums">
              Inquiry Reference {submittedInquiry.id}
            </p>
            <h2 className="text-xl font-bold text-[#0F172A]">
              Your project brief has been received
            </h2>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              We have routed your brief for{' '}
              <span className="font-semibold text-[#0F172A]">
                {submittedInquiry.serviceTitle}
              </span>{' '}
              directly to {submittedInquiry.creatorName}. Expect a response at{' '}
              <span className="font-medium text-[#0F172A]">{submittedInquiry.email}</span>{' '}
              within 1 business day.
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-slate-100 text-sm">
          <div>
            <dt className="text-xs text-slate-500">Project Title</dt>
            <dd className="font-medium text-[#0F172A] mt-0.5">
              {submittedInquiry.projectTitle}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Budget Range</dt>
            <dd className="font-medium text-[#0F172A] mt-0.5 tabular-nums">
              {submittedInquiry.budgetRange}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Expected Deadline</dt>
            <dd className="font-medium text-[#0F172A] mt-0.5 tabular-nums">
              {formatShortDate(submittedInquiry.deadline)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Assigned Creator</dt>
            <dd className="font-medium text-[#0F172A] mt-0.5">
              {submittedInquiry.creatorName}
            </dd>
          </div>
        </dl>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setSubmittedInquiry(null)}
            className="px-4 py-2.5 text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-lg transition-colors"
          >
            Submit Another Inquiry
          </button>
          <Link
            to="/dashboard?tab=inquiries"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-[#0F172A] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <span>View in Creator Dashboard</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="inquiry-client-name"
            className="block text-sm font-medium text-[#0F172A] mb-1.5"
          >
            Client Full Name <span className="text-rose-600">*</span>
          </label>
          <input
            id="inquiry-client-name"
            type="text"
            value={clientName}
            onChange={(e) => {
              setClientName(e.target.value);
              clearFieldError('clientName');
            }}
            placeholder="e.g. Jordan Mercer"
            aria-invalid={Boolean(errors.clientName)}
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#0F172A] placeholder:text-slate-400 focus:outline-none transition-colors ${
              errors.clientName
                ? 'border-rose-500 focus:border-rose-600'
                : 'border-slate-200 focus:border-[#6D28D9]'
            }`}
          />
          {errors.clientName && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.clientName}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="inquiry-email"
            className="block text-sm font-medium text-[#0F172A] mb-1.5"
          >
            Email Address <span className="text-rose-600">*</span>
          </label>
          <input
            id="inquiry-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearFieldError('email');
            }}
            placeholder="jordan@company.com"
            aria-invalid={Boolean(errors.email)}
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#0F172A] placeholder:text-slate-400 focus:outline-none transition-colors ${
              errors.email
                ? 'border-rose-500 focus:border-rose-600'
                : 'border-slate-200 focus:border-[#6D28D9]'
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="inquiry-service"
          className="block text-sm font-medium text-[#0F172A] mb-1.5"
        >
          Selected Service <span className="text-rose-600">*</span>
        </label>
        <select
          id="inquiry-service"
          value={serviceId}
          onChange={(e) => {
            setServiceId(e.target.value);
            clearFieldError('serviceId');
          }}
          aria-invalid={Boolean(errors.serviceId)}
          className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#0F172A] focus:outline-none transition-colors ${
            errors.serviceId
              ? 'border-rose-500 focus:border-rose-600'
              : 'border-slate-200 focus:border-[#6D28D9]'
          }`}
        >
          <option value="">Choose a service package...</option>
          {activeServices.map((srv) => {
            const creator = getCreatorById(srv.creatorId);
            return (
              <option key={srv.id} value={srv.id}>
                {srv.title} — {creator?.name ?? 'Studio'} ({formatCurrency(srv.price)})
              </option>
            );
          })}
        </select>
        {errors.serviceId && (
          <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{errors.serviceId}</span>
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="inquiry-project-title"
          className="block text-sm font-medium text-[#0F172A] mb-1.5"
        >
          Project Title <span className="text-rose-600">*</span>
        </label>
        <input
          id="inquiry-project-title"
          type="text"
          value={projectTitle}
          onChange={(e) => {
            setProjectTitle(e.target.value);
            clearFieldError('projectTitle');
          }}
          placeholder="e.g. Series A Rebrand & Marketing Website"
          aria-invalid={Boolean(errors.projectTitle)}
          className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#0F172A] placeholder:text-slate-400 focus:outline-none transition-colors ${
            errors.projectTitle
              ? 'border-rose-500 focus:border-rose-600'
              : 'border-slate-200 focus:border-[#6D28D9]'
          }`}
        />
        {errors.projectTitle && (
          <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{errors.projectTitle}</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="inquiry-budget"
            className="block text-sm font-medium text-[#0F172A] mb-1.5"
          >
            Budget Range <span className="text-rose-600">*</span>
          </label>
          <select
            id="inquiry-budget"
            value={budgetRange}
            onChange={(e) => {
              setBudgetRange(e.target.value);
              clearFieldError('budgetRange');
            }}
            aria-invalid={Boolean(errors.budgetRange)}
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#0F172A] focus:outline-none transition-colors ${
              errors.budgetRange
                ? 'border-rose-500 focus:border-rose-600'
                : 'border-slate-200 focus:border-[#6D28D9]'
            }`}
          >
            <option value="">Select budget range...</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          {errors.budgetRange && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.budgetRange}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="inquiry-deadline"
            className="block text-sm font-medium text-[#0F172A] mb-1.5"
          >
            Expected Deadline <span className="text-rose-600">*</span>
          </label>
          <input
            id="inquiry-deadline"
            type="date"
            value={deadline}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => {
              setDeadline(e.target.value);
              clearFieldError('deadline');
            }}
            aria-invalid={Boolean(errors.deadline)}
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#0F172A] focus:outline-none transition-colors ${
              errors.deadline
                ? 'border-rose-500 focus:border-rose-600'
                : 'border-slate-200 focus:border-[#6D28D9]'
            }`}
          />
          {errors.deadline && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.deadline}</span>
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="inquiry-description"
          className="block text-sm font-medium text-[#0F172A] mb-1.5"
        >
          Project Description &amp; Goals <span className="text-rose-600">*</span>
        </label>
        <textarea
          id="inquiry-description"
          rows={5}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            clearFieldError('description');
          }}
          placeholder="Outline your deliverables, target audience, brand references, and key milestones..."
          aria-invalid={Boolean(errors.description)}
          className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-[#0F172A] placeholder:text-slate-400 focus:outline-none transition-colors resize-y ${
            errors.description
              ? 'border-rose-500 focus:border-rose-600'
              : 'border-slate-200 focus:border-[#6D28D9]'
          }`}
        />
        {errors.description && (
          <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{errors.description}</span>
          </p>
        )}
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-slate-500">
          Your brief is saved locally and appears immediately in the Creator Dashboard.
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D28D9]"
        >
          Submit Inquiry
        </button>
      </div>
    </form>
  );
}
