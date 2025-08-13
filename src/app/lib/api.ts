// lib/api.ts
import { readItems } from '@directus/sdk';
import {
  directus,
  assetUrl,
  type CMS,
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
  const rows = await directus.request(
    readItems<CMS, 'hero_section'>('hero_section', {
      limit: 1,
      fields: [
        'id',
        'title',
        'description',
        'background.id',
        'background.width',
        'background.height',
      ],
      sort: ['-date_updated'],
    })
  );

  const hero = rows?.[0];
  if (!hero) return null;

  const bg = hero.background as DirectusFile | string | null;
  const background_width =
    typeof bg === 'object' && bg ? bg.width ?? null : null;
  const background_height =
    typeof bg === 'object' && bg ? bg.height ?? null : null;

  return {
    ...hero,
    background_url: assetUrl(bg),
    background_width,
    background_height,
  };
}

// ---------- ABOUT ----------
export type AboutDTO = AboutSection & {
  image_url?: string;
  image_width?: number | null;
  image_height?: number | null;
};

export async function getAboutSection(): Promise<AboutDTO | null> {
  const rows = await directus.request(
    readItems<CMS, 'about_section'>('about_section', {
      limit: 1,
      fields: [
        'id',
        'description',
        'image.id',
        'image.width',
        'image.height',
      ],
      sort: ['-date_updated'],
    })
  );

  const about = rows?.[0];
  if (!about) return null;

  const img = about.image as DirectusFile | string | null;
  const image_width = typeof img === 'object' && img ? img.width ?? null : null;
  const image_height =
    typeof img === 'object' && img ? img.height ?? null : null;

  return {
    ...about,
    image_url: assetUrl(img),
    image_width,
    image_height,
  };
}

// ---------- PAINTINGS ----------
export type PaintingDTO = Painting & {
  image_url?: string;
  image_width?: number | null;
  image_height?: number | null;
};

export async function getPaintings(): Promise<PaintingDTO[]> {
  const rows = await directus.request(
    readItems<CMS, 'paintings'>('paintings', {
      fields: [
        'id',
        'title',
        'year',
        'medium',
        'status',
        'image.id',
        'image.width',
        'image.height',
      ],
      filter: { status: { _eq: 'published' } }, // built-in status only here
      sort: ['-year'],
    })
  );

  // rows is Painting[] (typed), build DTOs with URLs + dimensions
  return (rows ?? []).map((p) => {
    const img = p.image as DirectusFile | string | null;
    const image_width = typeof img === 'object' && img ? img.width ?? null : null;
    const image_height =
      typeof img === 'object' && img ? img.height ?? null : null;

    return {
      ...p,
      image_url: assetUrl(img),
      image_width,
      image_height,
    };
  });
}
