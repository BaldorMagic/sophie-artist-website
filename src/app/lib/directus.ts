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
  description?: string;                 // Markdown
  background?: DirectusFile | string | null; // File relation
}

export interface AboutSection {
  id: number;
  image: DirectusFile | string | null;  // File relation
  description?: string;                 // Markdown
}

export interface Painting {
  id: string;
  title: string;
  image: DirectusFile | string | null;  // File relation
  year?: number;
  medium?: string;
  status?: DirectusStatus;
}

export interface CMS {
  hero_section: HeroSection;
  about_section: AboutSection;
  paintings: Painting;
}

export const directus = createDirectus<CMS>(
  process.env.NEXT_PUBLIC_DIRECTUS_URL as string
)
  .with(staticToken(process.env.DIRECTUS_ACCESS_TOKEN as string))
  .with(rest());

  export function assetUrl(file?: DirectusFile | string | null) {
    if (!file) return "";
    const id = typeof file === "string" ? file : file.id;
    return `/api/image/${id}`;
  }
  
