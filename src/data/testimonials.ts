import { ClientInquiry, Testimonial } from '../types/marketplace';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote:
      'We replaced three fragmented agency contracts with CreatorSpace. Amara rebuilt our Figma design system and Marcus shipped the React frontend in under four weeks.',
    authorName: 'Hannah Sato',
    authorRole: 'VP of Product',
    company: 'Kiteway Logistics',
    outcomeMetric: '38% faster onboarding completion in Q3',
  },
  {
    id: 'test-2',
    quote:
      'Elena’s brand identity manual gave our print vendors and web developers a single source of truth from day one. Every asset arrived organized and press-ready.',
    authorName: 'Claire Beaumont',
    authorRole: 'Head of Brand',
    company: 'Maison Leon Group',
    outcomeMetric: '+34% direct bookings post-rebrand',
  },
  {
    id: 'test-3',
    quote:
      'Finding a commercial colorist and still-life photographer with transparent fixed pricing cut our seasonal campaign production cycle in half.',
    authorName: 'Soren Lind',
    authorRole: 'Creative Producer',
    company: 'Fjord Outerwear',
    outcomeMetric: '1.8M organic campaign views in 60 days',
  },
];

export const INITIAL_INQUIRIES: ClientInquiry[] = [
  {
    id: 'INQ-2041',
    clientName: 'Claire Beaumont',
    email: 'claire@maisonleon.co',
    serviceId: 'srv-brand-identity',
    serviceTitle: 'Complete Brand Identity & Guidelines',
    creatorId: 'creator-elena',
    creatorName: 'Elena Vance',
    projectTitle: 'Q1 Boutique Resort Rebrand & Print Collateral',
    description:
      'Looking to unify visual identity across two new coastal properties, including embossed guest welcome kits and digital typography standards.',
    budgetRange: '$2,500 – $5,000',
    deadline: '2026-12-18',
    status: 'Responded',
    submittedAt: '2026-11-12T10:15:00.000Z',
  },
  {
    id: 'INQ-2042',
    clientName: 'Daniel Park',
    email: 'dpark@finchanalytics.io',
    serviceId: 'srv-react-web-app',
    serviceTitle: 'Custom React & Tailwind Web Application',
    creatorId: 'creator-marcus',
    creatorName: 'Marcus Thorne',
    projectTitle: 'Customer Benchmarking Portal Frontend',
    description:
      'Need a responsive React + TypeScript interface built from our finalized Figma screens, with accessible keyboard navigation and dark-navy executive reporting.',
    budgetRange: '$2,500 – $5,000',
    deadline: '2026-12-22',
    status: 'In Review',
    submittedAt: '2026-11-15T14:40:00.000Z',
  },
];
