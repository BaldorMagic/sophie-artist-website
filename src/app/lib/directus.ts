import { createDirectus, rest } from '@directus/sdk';
import { Painting } from '../types/painting';

const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL as string).with(rest());

export default directus;
