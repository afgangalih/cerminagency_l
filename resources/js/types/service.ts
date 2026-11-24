export interface ScopeItem {
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  desc: string;
}

export interface WhyUsData {
  title: string;
  description: string;
  bullets: string[];
}

export interface ShowcaseItem {
  title: string;
  category: string;
  image: string;
  metrics: string;
}

export interface PricingPackage {
  name: string;
  price: string;
  period: string;
  tagline: string;
  is_popular: boolean;
  features: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Service {
  id: number;
  slug: string;
  parent_slug?: string | null;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  hero_visual_type: 'dashboard' | 'reels_phone' | 'canvas_grid' | string;
  theme_gradient: 'navy' | 'warm_white' | 'cyan' | string;
  meta_title?: string;
  meta_description?: string;
  scopes: ScopeItem[];
  workflow_steps: WorkflowStep[];
  why_us_points: WhyUsData;
  showcase_items?: ShowcaseItem[];
  pricing_packages: PricingPackage[];
  faqs: FaqItem[];
  is_active: boolean;
  sort_order: number;
}

export interface ServiceNavSummary {
  id: number;
  slug: string;
  title: string;
  badge: string;
}

