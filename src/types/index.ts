export type LeadStatus = "new" | "contacted" | "qualified" | "closed";

export interface Lead {
  id: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  budgetTier?: string;
  timeline?: string;
  message?: string;
  status: LeadStatus;
  notes?: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export interface TestimonialItem {
  id: string;
  client_name_en: string;
  client_name_ar: string;
  client_title_en: string;
  client_title_ar: string;
  company_name_en: string;
  company_name_ar: string;
  quote_en: string;
  quote_ar: string;
  result_metric: string;
  result_label_en: string;
  result_label_ar: string;
  rating: number;
}

export interface Metric {
  val: string;
  lbl_en: string;
  lbl_ar: string;
}

export interface CaseStudyModule {
  challenge_en: string;
  challenge_ar: string;
  strategy_en: string;
  strategy_ar: string;
  execution_en: string;
  execution_ar: string;
  results_en: string;
  results_ar: string;
}

export interface Project {
  id: string;
  slug: string;
  company_name_en: string;
  company_name_ar: string;
  company_logo: string;
  title_en: string;
  title_ar: string;
  category_en: string;
  category_ar: string;
  tag_en: string;
  tag_ar: string;
  desc_en: string;
  desc_ar: string;
  year: string;
  hero_image: string;
  hero_media_type?: "image" | "video";
  gallery: string[];
  video_url?: string;
  featured: boolean;
  display_order: number;
  active: boolean;
  status?: "published" | "draft" | "archived";
  metrics: Metric[];
  case_study: CaseStudyModule;
}

export interface HeroMediaItem {
  id: string;
  title_en: string;
  title_ar: string;
  type: "image" | "video";
  url: string;
  poster?: string;
  display_order: number;
  duration_seconds: number;
  active: boolean;
}

export interface ServiceItem {
  id: string;
  name_en: string;
  name_ar: string;
  desc_en: string;
  desc_ar: string;
  badge_en: string;
  badge_ar: string;
  icon: string;
  display_order: number;
  active: boolean;
}

export interface StatItem {
  id: string;
  val: string;
  lbl_en: string;
  lbl_ar: string;
}

export interface SeoSettings {
  meta_title: string;
  meta_description: string;
  og_image: string;
  ga4_id?: string;
  google_search_console_tag?: string;
}

export interface SiteSettings {
  agency_name: string;
  slogan_en: string;
  slogan_ar: string;
  phone: string;
  whatsapp: string;
  whatsapp_prefilled_en: string;
  whatsapp_prefilled_ar: string;
  email: string;
  address_en: string;
  address_ar: string;
  instagram: string;
  linkedin: string;
  accent_color: string;
  hero_headline_en: string;
  hero_headline_ar: string;
  hero_subheadline_en: string;
  hero_subheadline_ar: string;
  about_headline_en: string;
  about_headline_ar: string;
  about_desc_en: string;
  about_desc_ar: string;
  vision_en: string;
  vision_ar: string;
  mission_en: string;
  mission_ar: string;
  work_badge_en?: string;
  work_badge_ar?: string;
  work_headline_en?: string;
  work_headline_ar?: string;
  services_badge_en?: string;
  services_badge_ar?: string;
  services_headline_en?: string;
  services_headline_ar?: string;
  services_subheadline_en?: string;
  services_subheadline_ar?: string;
  cta_badge_en?: string;
  cta_badge_ar?: string;
  cta_headline_en?: string;
  cta_headline_ar?: string;
  cta_subheadline_en?: string;
  cta_subheadline_ar?: string;
  hero_playback_mode?: "sequential" | "random";
  seo?: SeoSettings;
}

export interface AppDatabase {
  settings: SiteSettings;
  stats: StatItem[];
  services: ServiceItem[];
  projects: Project[];
  hero_media: HeroMediaItem[];
  leads: Lead[];
}
