"use client";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <span className="font-serif text-xl text-[#3C5A72]">Sophie Elhomsi</span>
        <div className="hidden sm:flex gap-6 text-sm">
          <a href="#gallery" className="hover:text-[#3C5A72]">Gallery</a>
          <a href="#about" className="hover:text-[#3C5A72]">About</a>
          <a href="#contact" className="hover:text-[#3C5A72]">Contact</a>
        </div>
      </nav>
    </header>
  );
}
