export interface ClientStoryItem {
  id: number;
  slug: string;
  client_name: string;
  logo_url: string;
  cover_image_url: string;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  deliverables: string;
  metrics: string | null;
  service_slug: string | null;
}

export interface ClientLogoItem {
  id: number;
  name: string;
  logo_url: string;
}

