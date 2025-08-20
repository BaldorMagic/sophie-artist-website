"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Item = {
    id: string;
    title: string;
    year: number | null;
    medium: string;
    src: string;
    width: number;
    height: number;
};

export default function GalleryClient({ items }: { items: Item[] }) {
    const [active, setActive] = useState<Item | null>(null);

    // Close on ESC
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") setActive(null);
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Prevent body scroll when modal open
    useEffect(() => {
        if (active) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [active]);

    return (
        <section id="gallery" className="mx-auto max-w-6xl px-4 py-20">
            <h2 className="text-3xl font-serif text-center mb-10 text-[#3C5A72]">
                Gallery
            </h2>

            {/* Masonry */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance] space-y-6">
                {items.map((p) => (
                    <figure
                        key={p.id}
                        className="break-inside-avoid overflow-hidden rounded-xl shadow-sm border bg-white cursor-zoom-in w-full" onClick={() => setActive(p)}
                        aria-label={`Open ${p.title}`}
                    >
                        <div className="relative">
                            <Image
                                src={p.src}
                                alt={p.title}
                                width={p.width}
                                height={p.height}
                                sizes="(max-width:1024px) 50vw, 33vw"
                                className="block w-full h-auto object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 hidden sm:flex items-end justify-end p-3 opacity-0 group-hover:opacity-100 transition">
                                <span className="rounded-lg bg-black/60 text-white text-xs px-2 py-1">
                                    View larger
                                </span>
                            </div>
                        </div>
                        <figcaption className="p-3 text-sm text-gray-700">
                            <div className="font-medium">{p.title}</div>
                            <div className="text-gray-500">
                                {p.year ? `${p.year} — ` : ""}{p.medium}
                            </div>
                        </figcaption>
                    </figure>
                ))}
            </div>

            {/* Modal */}
            {active && (
                <div
                    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-hidden"
                    onClick={() => setActive(null)}
                    aria-modal="true"
                    role="dialog"
                >
                    <div
                        className="relative w-full max-w-6xl max-h-[90vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            aria-label="Close"
                            onClick={() => setActive(null)}
                            className="absolute -top-10 right-0 text-white/90 hover:text-white text-2xl"
                        >
                            ×
                        </button>

                        {/* Scrollable image area constrained to viewport */}
                        <div className="relative flex-1 overflow-auto rounded-xl bg-black/30">
                            <div className="min-h-full min-w-full flex items-center justify-center">
                                <Image
                                    src={active.src}
                                    alt={active.title}
                                    width={active.width}
                                    height={active.height}
                                    sizes="100vw"
                                    className="h-auto w-auto max-h-[85vh] max-w-full object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Caption */}
                        <div className="mt-4 text-white">
                            <div className="text-lg font-semibold">{active.title}</div>
                            <div className="text-sm text-white/80">
                                {active.year ? `${active.year} — ` : ""}{active.medium}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
