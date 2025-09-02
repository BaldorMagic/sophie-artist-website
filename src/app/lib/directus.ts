import { createDirectus, rest, staticToken } from '@directus/sdk';

export type DirectusStatus = 'published' | 'draft' | 'archived';

export interface DirectusFile {
  id: string;
  width?: number | null;
  height?: number | null;
}

export interface HeroSection {
  id: number;
  title?: string;
  description?: string;                
  background?: DirectusFile | string | null;
}

export interface AboutSection {
  id: number;
  image: DirectusFile | string | null;  
  description?: string;                 
}

export interface Painting {
  id: string;
  title: string;
  painting: DirectusFile | string | null;
  year?: number;
  medium?: string[];
  status?: DirectusStatus;
}

export interface CMS {
  hero_section: HeroSection;
  about_section: AboutSection;
  paintings: Painting;
}

export const directus = createDirectus<CMS>(
  process.env.DIRECTUS_URL as string
)
  .with(staticToken(process.env.DIRECTUS_ACCESS_TOKEN as string))
  .with(rest());

export function assetUrl(file?: DirectusFile | string | null) {
  if (!file) return "";
  const id = typeof file === "string" ? file : file.id;
  return `/api/image/${id}`;
}

