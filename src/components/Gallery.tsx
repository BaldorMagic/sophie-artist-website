import { getPaintings } from "../app/lib/api";
import GalleryClient from "./GalleryClient";

export default async function Gallery() {
  const paintings = await getPaintings();

  const items = paintings
    .filter((p) => p.image_url && p.image_width && p.image_height)
    .map((p) => ({
      id: p.id,
      title: p.title,
      year: p.year ?? null,
      medium: p.medium ?? "",
      src: p.image_url!,
      width: p.image_width!,
      height: p.image_height!,
    }));
    console.log(items);
  return <GalleryClient items={items} />;
}
