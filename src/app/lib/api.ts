import { readSingleton, readItems } from '@directus/sdk';
import {
  directus,
  assetUrl,
  type DirectusFile,
  type HeroSection,
  type AboutSection,
  type Painting,
} from './directus';

// ---------- HERO ----------
export type HeroDTO = HeroSection & {
  background_url?: string;
  background_width?: number | null;
  background_height?: number | null;
};

export async function getHeroSection(): Promise<HeroDTO | null> {
  const res = await directus.request(
    readSingleton('hero_section', {
      fields: [
        'id',
        'title',
        'description',
        'background.id',
        'background.width',
        'background.height',
      ],
    })
  ) as unknown;

  const hero = (res ?? null) as HeroSection | null;
  if (!hero) return null;

  const bg = hero.background as DirectusFile | string | null;
  return {
    ...hero,
    background_url: assetUrl(bg),
    background_width: typeof bg === 'object' && bg ? bg.width ?? null : null,
    background_height: typeof bg === 'object' && bg ? bg.height ?? null : null,
  };
}

// ---------- ABOUT ----------
export type AboutDTO = AboutSection & {
  image_url?: string;
  image_width?: number | null;
  image_height?: number | null;
};

export async function getAboutSection(): Promise<AboutDTO | null> {
  const res = await directus.request(
    readSingleton('about_section', {
      fields: ['id', 'description', 'image.id', 'image.width', 'image.height'],
    })
  ) as unknown;

  const about = (res ?? null) as AboutSection | null;
  if (!about) return null;

  const img = about.image as DirectusFile | string | null;
  return {
    ...about,
    image_url: assetUrl(img),
    image_width: typeof img === 'object' && img ? img.width ?? null : null,
    image_height: typeof img === 'object' && img ? img.height ?? null : null,
  };
}

// ---------- PAINTINGS (status filter ONLY here) ----------
export type PaintingDTO = Painting & {
  image_url?: string;
  image_width?: number | null;
  image_height?: number | null;
};

export async function getPaintings(): Promise<PaintingDTO[]> {
  const res = await directus.request(
    readItems('paintings', {
      fields: [
        'id',
        'title',
        'year',
        'medium',
        'status',
        'image.id',      // ✅ correct relation key
        'image.width',
        'image.height',
      ],
      filter: { status: { _eq: 'published' } },
      sort: ['-year'],
    })
  ) as unknown;

  const rows: Painting[] = Array.isArray(res) ? (res as Painting[]) : [];

  return rows.map((p) => {
    const img = p.painting as DirectusFile | string | null;
    return {
      ...p,
      image_url: assetUrl(img),
      image_width: typeof img === 'object' && img ? img.width ?? null : null,
      image_height: typeof img === 'object' && img ? img.height ?? null : null,
    };
  });
}
