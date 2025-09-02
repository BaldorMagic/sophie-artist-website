// src/components/Header.tsx
"use client";

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('Navigation');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? 'bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80' : 'bg-white'} border-b`}>
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#top" className="font-serif text-2xl tracking-tight text-[#2f4a5c] hover:text-[#203443] transition-colors">
          Sophie Elhomsi
        </a>

        <ul className="hidden sm:flex items-center gap-6">
          <li><a href="#gallery" className="relative inline-block text-sm text-gray-700 hover:text-[#2f4a5c] transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#2f4a5c] hover:after:w-full after:transition-all after:duration-300">{t('Gallery')}</a></li>
          <li><a href="#about"   className="relative inline-block text-sm text-gray-700 hover:text-[#2f4a5c] transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#2f4a5c] hover:after:w-full after:transition-all after:duration-300">{t('About')}</a></li>
          <li><a href="#contact" className="relative inline-block text-sm text-gray-700 hover:text-[#2f4a5c] transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#2f4a5c] hover:after:w-full after:transition-all after:duration-300">{t('Contact')}</a></li>
        </ul>
      </nav>

      {open && (
        <div className="sm:hidden border-t bg-white">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {(['Gallery','About','Contact'] as const).map((key) => (
              <li key={key}>
                <a href={`#${key}`} onClick={() => setOpen(false)} className="block py-3 text-base text-gray-800 hover:text-[#2f4a5c] transition-colors relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-[#2f4a5c] hover:after:w-full after:transition-all after:duration-300">
                  {t(`${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
