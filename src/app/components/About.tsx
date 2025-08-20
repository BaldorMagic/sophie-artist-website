import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { getAboutSection } from "../lib/api";

export default async function About() {
  const about = await getAboutSection();
  if (!about) return null;

  const hasImg =
    !!about.image_url && !!about.image_width && !!about.image_height;

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {hasImg && (
          <div className="overflow-hidden rounded-2xl shadow border bg-white">
            <Image
              src={about.image_url!}
              alt="Artist portrait"
              width={about.image_width!}
              height={about.image_height!}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}
        <div>
          <h2 className="text-3xl font-serif mb-4 text-[#3C5A72]">About</h2>
          {about.description ? (
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown>{about.description}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-gray-600">No about content yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
