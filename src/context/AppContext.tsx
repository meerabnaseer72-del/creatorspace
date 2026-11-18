import React, { createContext, useContext, useState, useCallback } from 'react';
import { ClientInquiry, Creator, Service, ServiceStatus } from '../types/marketplace';
import { CREATORS } from '../data/creators';
import { INITIAL_SERVICES } from '../data/services';
import { INITIAL_INQUIRIES } from '../data/testimonials';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface ToastMessage {
  id: string;
  message: string;
  tone?: 'default' | 'success' | 'warning';
}

export interface NewServiceInput {
  title: string;
  category: Service['category'];
  creatorId: string;
  price: number;
  deliveryDays: number;
  revisions: number;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  image: string;
  status: ServiceStatus;
}

export interface NewInquiryInput {
  clientName: string;
  email: string;
  serviceId: string;
  projectTitle: string;
  description: string;
  budgetRange: string;
  deadline: string;
}

interface AppContextValue {
  creators: Creator[];
  services: Service[];
  inquiries: ClientInquiry[];
  toasts: ToastMessage[];
  getCreatorById: (id: string) => Creator | undefined;
  getServiceById: (id: string) => Service | undefined;
  getServicesByCreator: (creatorId: string) => Service[];
  addService: (input: NewServiceInput) => Service;
  updateService: (id: string, updates: Partial<NewServiceInput>) => void;
  deleteService: (id: string) => void;
  toggleServiceStatus: (id: string) => void;
  addInquiry: (input: NewInquiryInput) => ClientInquiry;
  updateInquiryStatus: (id: string, status: ClientInquiry['status']) => void;
  deleteInquiry: (id: string) => void;
  showToast: (message: string, tone?: ToastMessage['tone']) => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useLocalStorage<Service[]>(
    'creatorspace_services',
    INITIAL_SERVICES
  );
  const [inquiries, setInquiries] = useLocalStorage<ClientInquiry[]>(
    'creatorspace_inquiries',
    INITIAL_INQUIRIES
  );
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, tone: ToastMessage['tone'] = 'default') => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev.slice(-2), { id, message, tone }]);
      window.setTimeout(() => {
        dismissToast(id);
      }, 3200);
    },
    [dismissToast]
  );

  const getCreatorById = useCallback(
    (id: string) => CREATORS.find((creator) => creator.id === id),
    []
  );

  const getServiceById = useCallback(
    (id: string) => services.find((service) => service.id === id),
    [services]
  );

  const getServicesByCreator = useCallback(
    (creatorId: string) => services.filter((service) => service.creatorId === creatorId),
    [services]
  );

  const addService = useCallback(
    (input: NewServiceInput): Service => {
      const created: Service = {
        id: `srv-${Date.now().toString(36)}`,
        creatorId: input.creatorId,
        title: input.title.trim(),
        category: input.category,
        price: Number(input.price),
        deliveryDays: Number(input.deliveryDays),
        revisions: Number(input.revisions),
        rating: 5.0,
        reviewCount: 0,
        image: input.image,
        shortDescription: input.shortDescription.trim(),
        fullDescription: input.fullDescription.trim(),
        deliverables: input.deliverables.filter((item) => item.trim().length > 0),
        status: input.status,
        featured: false,
        createdAt: new Date().toISOString().split('T')[0],
      };

      setServices((prev) => [created, ...prev]);
      showToast(`Service "${created.title}" published.`, 'success');
      return created;
    },
    [setServices, showToast]
  );

  const updateService = useCallback(
    (id: string, updates: Partial<NewServiceInput>) => {
      setServices((prev) =>
        prev.map((service) =>
          service.id === id
            ? {
                ...service,
                ...updates,
                price: updates.price !== undefined ? Number(updates.price) : service.price,
                deliveryDays:
                  updates.deliveryDays !== undefined
                    ? Number(updates.deliveryDays)
                    : service.deliveryDays,
                revisions:
                  updates.revisions !== undefined
                    ? Number(updates.revisions)
                    : service.revisions,
              }
            : service
        )
      );
      showToast('Service details updated.', 'success');
    },
    [setServices, showToast]
  );

  const deleteService = useCallback(
    (id: string) => {
      setServices((prev) => prev.filter((service) => service.id !== id));
      showToast('Service removed from your catalog.', 'warning');
    },
    [setServices, showToast]
  );

  const toggleServiceStatus = useCallback(
    (id: string) => {
      setServices((prev) =>
        prev.map((service) =>
          service.id === id
            ? {
                ...service,
                status: service.status === 'Active' ? 'Paused' : 'Active',
              }
            : service
        )
      );
      showToast('Service visibility updated.');
    },
    [setServices, showToast]
  );

  const addInquiry = useCallback(
    (input: NewInquiryInput): ClientInquiry => {
      const targetService = services.find((s) => s.id === input.serviceId);
      const targetCreator = CREATORS.find((c) => c.id === targetService?.creatorId);

      const inquiry: ClientInquiry = {
        id: `INQ-${Math.floor(2050 + Math.random() * 7900)}`,
        clientName: input.clientName.trim(),
        email: input.email.trim(),
        serviceId: input.serviceId,
        serviceTitle: targetService?.title ?? 'Custom Creative Project',
        creatorId: targetCreator?.id ?? 'creator-elena',
        creatorName: targetCreator?.name ?? 'CreatorSpace Studio',
        projectTitle: input.projectTitle.trim(),
        description: input.description.trim(),
        budgetRange: input.budgetRange,
        deadline: input.deadline,
        status: 'New',
        submittedAt: new Date().toISOString(),
      };

      setInquiries((prev) => [inquiry, ...prev]);
      showToast('Project inquiry sent successfully.', 'success');
      return inquiry;
    },
    [services, setInquiries, showToast]
  );

  const updateInquiryStatus = useCallback(
    (id: string, status: ClientInquiry['status']) => {
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );
      showToast(`Inquiry marked as ${status}.`);
    },
    [setInquiries, showToast]
  );

  const deleteInquiry = useCallback(
    (id: string) => {
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      showToast('Inquiry archived.', 'warning');
    },
    [setInquiries, showToast]
  );

  return (
    <AppContext.Provider
      value={{
        creators: CREATORS,
        services,
        inquiries,
        toasts,
        getCreatorById,
        getServiceById,
        getServicesByCreator,
        addService,
        updateService,
        deleteService,
        toggleServiceStatus,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
}
