import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { getAboutSection } from '../lib/api';

export default async function About() {
  const about = await getAboutSection();
  if (!about) return null;

  return (
    <section>
      {about.image_url && about.image_width && about.image_height && (
        <Image
          src={about.image_url}
          alt="About image"
          width={about.image_width}
          height={about.image_height}
        />
      )}
      <ReactMarkdown>{about.description || ''}</ReactMarkdown>
    </section>
  );
}
