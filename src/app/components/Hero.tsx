import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { getHeroSection } from "../lib/api";

export default async function Hero() {
  const hero = await getHeroSection();
  if (!hero) return null;

  const hasBg =
    !!hero.background_url &&
    !!hero.background_width &&
    !!hero.background_height;

  return (
    <section className="relative isolate min-h-[560px] h-[90vh] flex items-center bg-[#FAF8F4]">
      {hasBg && (
        <Image
          src={hero.background_url!}
          alt=""
          aria-hidden
          width={hero.background_width!}
          height={hero.background_height!}
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {hero.title && (
          <h1 className="font-serif text-4xl md:text-6xl text-white drop-shadow">
            {hero.title}
          </h1>
        )}
        {hero.description && (
          <div className="text-white prose prose-invert prose-lg mx-auto mt-6">
            <ReactMarkdown>{hero.description}</ReactMarkdown>
          </div>
        )}
        <div className="mt-8">
          <a
            href="#gallery"
            className="inline-block rounded-2xl bg-[#3C5A72] px-6 py-3 text-white hover:opacity-90"
          >
            View Gallery
          </a>
        </div>
      </div>
    </section>
  );
}
