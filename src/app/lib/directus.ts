import { createDirectus, rest, staticToken } from '@directus/sdk';

export interface DirectusFile {
    id: string;
    filename_disk: string;
    filename_download: string;
    title?: string;
    description?: string;
    type?: string;
    width: number;
    height: number;
}

export interface HeroSection {
    id: number;
    title?: string;
    description?: string;
    background?: DirectusFile | string | null;
}

export interface Painting {
    id: string;
    status: 'Published' | 'draft' | 'archived';
    title?: string;
    painting: DirectusFile | string | null;
    year?: string;
    medium?: string[];
}

export interface AboutSection {
    id: number;
    image: DirectusFile | string | null;
    description?: string;
}

const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL as string)
.with(staticToken(process.env.DIRECTUS_ACCESS_TOKEN as string))
.with(rest());

export default directus;