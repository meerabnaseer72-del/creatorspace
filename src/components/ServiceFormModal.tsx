import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useApp, NewServiceInput } from '../context/AppContext';
import { Service, ServiceCategory, ServiceStatus } from '../types/marketplace';

interface ServiceFormModalProps {
  isOpen: boolean;
  editingService: Service | null;
  onClose: () => void;
}

const IMAGE_PRESETS: Record<ServiceCategory, string> = {
  Branding: '/src/assets/images/service_brand_identity_1794983222061.jpg',
  'UI/UX Design': '/src/assets/images/service_ui_ux_design_1794983223429.jpg',
  'Web Development': '/src/assets/images/service_web_development_1794983225028.jpg',
  'Video Editing': '/src/assets/images/service_video_editing_1794983224121.jpg',
  Photography: '/src/assets/images/service_photography_editorial_1794983225114.jpg',
  'Digital Marketing': '/src/assets/images/service_digital_marketing_1794983224949.jpg',
  'Content Writing': '/src/assets/images/service_content_writing_1794983225689.jpg',
  'Graphic Design': '/src/assets/images/service_motion_3d_1794983226134.jpg',
};

export function ServiceFormModal({
  isOpen,
  editingService,
  onClose,
}: ServiceFormModalProps) {
  const { creators, addService, updateService } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('UI/UX Design');
  const [creatorId, setCreatorId] = useState(creators[0]?.id ?? 'creator-elena');
  const [price, setPrice] = useState('1200');
  const [deliveryDays, setDeliveryDays] = useState('7');
  const [revisions, setRevisions] = useState('2');
  const [status, setStatus] = useState<ServiceStatus>('Active');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [deliverablesText, setDeliverablesText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingService) {
      setTitle(editingService.title);
      setCategory(editingService.category);
      setCreatorId(editingService.creatorId);
      setPrice(String(editingService.price));
      setDeliveryDays(String(editingService.deliveryDays));
      setRevisions(String(editingService.revisions));
      setStatus(editingService.status);
      setShortDescription(editingService.shortDescription);
      setFullDescription(editingService.fullDescription);
      setDeliverablesText(editingService.deliverables.join('\n'));
      setError('');
    } else {
      setTitle('');
      setCategory('UI/UX Design');
      setCreatorId(creators[0]?.id ?? 'creator-elena');
      setPrice('1200');
      setDeliveryDays('7');
      setRevisions('2');
      setStatus('Active');
      setShortDescription('');
      setFullDescription('');
      setDeliverablesText(
        'Discovery & brief alignment session\nHigh-fidelity source deliverables\nFinal export & handoff documentation'
      );
      setError('');
    }
  }, [editingService, isOpen, creators]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedPrice = Number(price);
    const parsedDays = Number(deliveryDays);
    const parsedRevisions = Number(revisions);

    if (!title.trim() || title.trim().length < 4) {
      setError('Service title must be at least 4 characters.');
      return;
    }
    if (!Number.isFinite(parsedPrice) || parsedPrice < 50) {
      setError('Please enter a valid price of at least $50.');
      return;
    }
    if (!Number.isFinite(parsedDays) || parsedDays < 1) {
      setError('Delivery time must be at least 1 day.');
      return;
    }
    if (!shortDescription.trim() || shortDescription.trim().length < 12) {
      setError('Please enter a short summary of at least 12 characters.');
      return;
    }

    const deliverables = deliverablesText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const payload: NewServiceInput = {
      title: title.trim(),
      category,
      creatorId,
      price: parsedPrice,
      deliveryDays: parsedDays,
      revisions: Number.isFinite(parsedRevisions) && parsedRevisions >= 0 ? parsedRevisions : 2,
      shortDescription: shortDescription.trim(),
      fullDescription: fullDescription.trim() || shortDescription.trim(),
      deliverables:
        deliverables.length > 0
          ? deliverables
          : ['Complete source files & final export package'],
      image: editingService ? editingService.image : IMAGE_PRESETS[category],
      status,
    };

    if (editingService) {
      updateService(editingService.id, payload);
    } else {
      addService(payload);
    }

    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1120]/60 backdrop-blur-xs"
    >
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
          <h2 id="service-modal-title" className="text-lg font-bold text-[#0F172A]">
            {editingService ? 'Edit Service Package' : 'Add New Service'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-[#0F172A] transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label
              htmlFor="service-form-title"
              className="block text-sm font-medium text-[#0F172A] mb-1.5"
            >
              Service Title
            </label>
            <input
              id="service-form-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Modular Design System & Figma Kit"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:border-[#6D28D9] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="service-form-category"
                className="block text-sm font-medium text-[#0F172A] mb-1.5"
              >
                Category
              </label>
              <select
                id="service-form-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-white focus:border-[#6D28D9] focus:outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="service-form-creator"
                className="block text-sm font-medium text-[#0F172A] mb-1.5"
              >
                Creator Profile
              </label>
              <select
                id="service-form-creator"
                value={creatorId}
                onChange={(e) => setCreatorId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-white focus:border-[#6D28D9] focus:outline-none"
              >
                {creators.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.primaryCategory})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label
                htmlFor="service-form-price"
                className="block text-sm font-medium text-[#0F172A] mb-1.5"
              >
                Price (USD)
              </label>
              <input
                id="service-form-price"
                type="number"
                min={50}
                step={10}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 tabular-nums focus:border-[#6D28D9] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="service-form-delivery"
                className="block text-sm font-medium text-[#0F172A] mb-1.5"
              >
                Delivery (Days)
              </label>
              <input
                id="service-form-delivery"
                type="number"
                min={1}
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 tabular-nums focus:border-[#6D28D9] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="service-form-revisions"
                className="block text-sm font-medium text-[#0F172A] mb-1.5"
              >
                Revisions
              </label>
              <input
                id="service-form-revisions"
                type="number"
                min={0}
                value={revisions}
                onChange={(e) => setRevisions(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 tabular-nums focus:border-[#6D28D9] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="service-form-status"
                className="block text-sm font-medium text-[#0F172A] mb-1.5"
              >
                Status
              </label>
              <select
                id="service-form-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as ServiceStatus)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-white focus:border-[#6D28D9] focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="service-form-short"
              className="block text-sm font-medium text-[#0F172A] mb-1.5"
            >
              Short Summary (Card Preview)
            </label>
            <input
              id="service-form-short"
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Concise one-line overview of what the client receives..."
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:border-[#6D28D9] focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="service-form-full"
              className="block text-sm font-medium text-[#0F172A] mb-1.5"
            >
              Detailed Scope Description
            </label>
            <textarea
              id="service-form-full"
              rows={3}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              placeholder="Explain the workflow, methodology, and ideal client fit..."
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:border-[#6D28D9] focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="service-form-deliverables"
              className="block text-sm font-medium text-[#0F172A] mb-1.5"
            >
              Included Deliverables (One per line)
            </label>
            <textarea
              id="service-form-deliverables"
              rows={3}
              value={deliverablesText}
              onChange={(e) => setDeliverablesText(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:border-[#6D28D9] focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-lg transition-colors"
            >
              {editingService ? 'Save Changes' : 'Publish Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
