import Image from 'next/image';
import { getPaintings } from '../lib/api';

export default async function Gallery() {
  const paintings = await getPaintings();

  return (
    <section>
      {paintings.map((p) => (
        <figure key={p.id}>
          {p.image_url && p.image_width && p.image_height && (
            <Image
              src={p.image_url}
              alt={p.title}
              width={p.image_width}
              height={p.image_height}
            />
          )}
          <figcaption>
            {p.title} ({p.year}) – {p.medium}
          </figcaption>
        </figure>
      ))}
    </section>
  );
}
