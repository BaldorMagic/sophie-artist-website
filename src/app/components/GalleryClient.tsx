"use client";

import { useEffect, useRef, useState } from "react";
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
  // lightbox state
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // refs
  const drag = useRef<{ x: number; y: number } | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const clickMeta = useRef<{ downX: number; downY: number } | null>(null);

  const active = items[index];

  // lock body scroll when modal open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // keyboard controls
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowRight")
        setIndex((i) => (i + 1) % items.length);
      else if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + items.length) % items.length);
      else if (e.key === "+") zoomIn();
      else if (e.key === "-") zoomOut();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items.length]);

  // reveal cards on scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("!opacity-100", "!translate-x-0");
            el.classList.remove("opacity-0", "translate-x-8");
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [items.length]);

  // helpers
  const resetView = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };
  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
    resetView();
  };
  const next = () => {
    setIndex((i) => (i + 1) % items.length);
    resetView();
  };
  const prev = () => {
    setIndex((i) => (i - 1 + items.length) % items.length);
    resetView();
  };
  const zoomIn = () =>
    setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)));
  const zoomOut = () =>
    setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)));

  // wheel zoom (ctrl + wheel)
  const onWheel = (e: React.WheelEvent) => {
    if (!e.ctrlKey) return;
    e.preventDefault();
    setZoom((z) =>
      Math.max(1, Math.min(3, +(z + (e.deltaY > 0 ? -0.2 : 0.2)).toFixed(2)))
    );
  };

  // pan/zoom handlers (ONLY on the image wrapper)
  const onMouseDown = (e: React.MouseEvent) => {
    clickMeta.current = { downX: e.clientX, downY: e.clientY };
    if (zoom === 1) return;
    drag.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag.current) return;
    setOffset({
      x: e.clientX - drag.current.x,
      y: e.clientY - drag.current.y,
    });
  };
  const onMouseUp = (e: React.MouseEvent) => {
    drag.current = null;
    // if there was no drag, treat as click -> toggle zoom
    const m = clickMeta.current;
    clickMeta.current = null;
    if (!m) return;
    const dx = Math.abs(e.clientX - m.downX);
    const dy = Math.abs(e.clientY - m.downY);
    if (dx < 4 && dy < 4) {
      // click toggles zoom, double-click not required
      setZoom((z) => (z === 1 ? 1.75 : 1));
      setOffset({ x: 0, y: 0 });
    }
  };

  // swipe
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = touchStart.current;
    if (!s) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - s.x;
    const dy = t.clientY - s.y;
    if (Math.abs(dx) > 60 && Math.abs(dy) < 80) {
      if (dx < 0) next();
      else prev();
    }
    touchStart.current = null;
  };

  return (
    <section id="gallery" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-3xl font-serif text-center mb-10 text-[#3C5A72]">
        Gallery
      </h2>

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance] space-y-6">
        {items.map((p, i) => (
          <figure
            key={p.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="group break-inside-avoid overflow-hidden rounded-xl border bg-white shadow-sm w-full cursor-zoom-in
                       opacity-0 translate-x-8 transition-all duration-700 ease-out"
            style={{ transitionDelay: `${(i % 10) * 60}ms` }}
            onClick={() => openAt(i)}
            aria-label={`Open ${p.title}`}
          >
            {/* keep <img> for perfect column flow; swap to <Image> if you prefer */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={p.title}
              width={p.width}
              height={p.height}
              loading="lazy"
              className="block w-full h-auto object-cover"
            />
            <figcaption className="p-3 text-sm">
              <div className="font-medium text-gray-800">{p.title}</div>
              <div className="text-gray-500">
                {p.year ? `${p.year} — ` : ""}
                {p.medium}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Lightbox */}
      {open && active && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute inset-0 p-4 md:p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* top bar */}
            <div className="flex items-center justify-between text-white/90 mb-3 select-none">
              <div className="text-sm">
                {index + 1} / {items.length}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={zoomOut}
                  className="rounded-md border border-white/30 px-3 py-1 text-sm hover:bg-white/10"
                >
                  −
                </button>
                <span className="tabular-nums w-12 text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={zoomIn}
                  className="rounded-md border border-white/30 px-3 py-1 text-sm hover:bg-white/10"
                >
                  +
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-white/30 px-3 py-1 text-sm hover:bg-white/10"
                >
                  Esc
                </button>
              </div>
            </div>

            {/* stage */}
            <div
              className="relative flex-1 overflow-hidden rounded-xl bg-black/40"
              onWheel={onWheel}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* arrows with high z-index */}
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer z-30"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer z-30"
                aria-label="Next"
              >
                ›
              </button>

              {/* center stage; ONLY the image wrapper has the zoom cursor & handlers */}
              <div className="absolute inset-0 grid place-items-center select-none">
                <div
                  className={`inline-block ${
                    zoom === 1 ? "cursor-zoom-in" : "cursor-zoom-out"
                  }`}
                  onMouseDown={onMouseDown}
                  onMouseMove={onMouseMove}
                  onMouseUp={onMouseUp}
                  onMouseLeave={() => {
                    drag.current = null;
                    clickMeta.current = null;
                  }}
                  // transform on the wrapper; wrapper shrink-wraps to image (inline-block)
                  style={{
                    transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoom})`,
                    transition: drag.current ? "none" : "transform 150ms ease",
                  }}
                >
                  <Image
                    src={active.src}
                    alt={active.title}
                    width={active.width}
                    height={active.height}
                    sizes="100vw"
                    className="max-h-[82vh] max-w-[95vw] object-contain select-none"
                    priority
                    draggable={false}
                  />
                </div>
              </div>
            </div>

            {/* caption */}
            <div className="mt-3 text-white">
              <div className="text-base font-semibold">{active.title}</div>
              <div className="text-sm text-white/80">
                {active.year ? `${active.year} · ` : ""}
                {active.medium}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
