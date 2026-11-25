export interface PortfolioCategoryItem {
  id: number;
  slug: string;
  name: string;
  short_label: string | null;
  icon_name: string;
  service_slug: string | null;
  portfolios_count?: number;
}

export interface PortfolioItem {
  id: number;
  slug: string;
  title: string;
  client_name: string;
  category_slug: string;
  industry: string;
  service_slug: string | null;
  thumbnail_url: string;
  gallery_images: string[] | null;
  deliverables_summary: string;
  metrics: string | null;
  summary: string;
  external_url: string | null;
  is_featured: boolean;
  category?: {
    slug: string;
    name: string;
    short_label: string | null;
  };
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginatedPortfolios {
  data: PortfolioItem[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
  links: PaginationLink[];
}

export interface PortfolioFilters {
  category: string;
  search: string;
  per_page: number;
}

export interface PortfolioServiceSummary {
  id: number;
  slug: string;
  title: string;
}

