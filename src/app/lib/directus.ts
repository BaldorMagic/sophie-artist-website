import { createDirectus, rest, staticToken } from '@directus/sdk';

export type DirectusStatus = 'published' | 'draft' | 'archived';

export interface DirectusFile {
  id: string;
  width?: number | null;
  height?: number | null;
  // (you can add more if you need: type, filesize, etc.)
}

export interface HeroSection {
  id: number;
  title?: string;
  description?: string;                 // Markdown
  background?: DirectusFile | string | null; // File relation recommended
}

export interface AboutSection {
  id: number;
  image: DirectusFile | string | null;  // File relation recommended
  description?: string;                 // Markdown
}

export interface Painting {
  id: string;
  title: string;
  image: DirectusFile | string | null;  // File relation recommended
  year?: number;
  medium?: string;
  status?: DirectusStatus;              // built-in status only here
}

export interface CMS {
  hero_section: HeroSection;
  about_section: AboutSection;
  paintings: Painting;
  // files: DirectusFile  // not needed if you select nested fields below
}

export const directus = createDirectus<CMS>(
  process.env.NEXT_PUBLIC_DIRECTUS_URL as string
)
  .with(staticToken(process.env.DIRECTUS_ACCESS_TOKEN as string))
  .with(rest());

// Build a Directus asset URL from a file relation or raw string id
export function assetUrl(file?: DirectusFile | string | null) {
  if (!file) return '';
  const id = typeof file === 'string' ? file : file.id;
  return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${id}`;
}
