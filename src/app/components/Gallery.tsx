import { getPaintings } from "../lib/api";
import GalleryClient from "./GalleryClient";

export default async function Gallery() {
  const paintings = await getPaintings();

  // Keep only serializable props
  const items = paintings
    .filter(p => p.image_url && p.image_width && p.image_height)
    .map(p => ({
      id: p.id,
      title: p.title,
      year: p.year ?? null,
      medium: p.medium ?? "",
      src: p.image_url!,          // /api/image/<id>
      width: p.image_width!,      // real width
      height: p.image_height!,    // real height
    }));

  return <GalleryClient items={items} />;
}
