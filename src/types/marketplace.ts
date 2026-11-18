export type ServiceCategory =
  | 'Graphic Design'
  | 'Web Development'
  | 'UI/UX Design'
  | 'Digital Marketing'
  | 'Content Writing'
  | 'Video Editing'
  | 'Photography'
  | 'Branding';

export type ServiceStatus = 'Active' | 'Paused';

export interface CategoryInfo {
  id: string;
  name: ServiceCategory;
  description: string;
  serviceCount: number;
  iconName:
    | 'PenTool'
    | 'Code2'
    | 'Layout'
    | 'TrendingUp'
    | 'FileText'
    | 'Film'
    | 'Camera'
    | 'Compass';
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  year: string;
  category: ServiceCategory;
  image: string;
  summary: string;
  outcome: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  date: string;
  comment: string;
  serviceTitle?: string;
}

export interface Creator {
  id: string;
  name: string;
  title: string;
  location: string;
  avatar: string;
  coverTone: string;
  primaryCategory: ServiceCategory;
  skills: string[];
  experienceYears: number;
  completedProjects: number;
  rating: number;
  reviewCount: number;
  responseTime: string;
  bio: string;
  introduction: string;
  portfolio: PortfolioProject[];
  reviews: Review[];
}

export interface Service {
  id: string;
  creatorId: string;
  title: string;
  category: ServiceCategory;
  price: number;
  deliveryDays: number;
  revisions: number;
  rating: number;
  reviewCount: number;
  image: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  status: ServiceStatus;
  featured?: boolean;
  createdAt: string;
}

export interface ClientInquiry {
  id: string;
  clientName: string;
  email: string;
  serviceId: string;
  serviceTitle: string;
  creatorId: string;
  creatorName: string;
  projectTitle: string;
  description: string;
  budgetRange: string;
  deadline: string;
  status: 'New' | 'In Review' | 'Responded';
  submittedAt: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  company: string;
  outcomeMetric: string;
}
