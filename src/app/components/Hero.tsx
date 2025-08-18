import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { getHeroSection } from '../lib/api';

export default async function Hero() {
  const hero = await getHeroSection();
  if (!hero) return null;

  return (
    <section>
      {hero.background_url && hero.background_width && hero.background_height && (
        <Image
          src={hero.background_url}
          alt={hero.title || ''}
          width={hero.background_width}
          height={hero.background_height}
          priority
        />
      )}
      <h1>{hero.title}</h1>
      <ReactMarkdown>{hero.description || ''}</ReactMarkdown>
    </section>
  );
}
