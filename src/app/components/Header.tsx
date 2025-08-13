"use client";
import ScrollLink from "./ScrollLink";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <nav className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-serif">Sophie Elhomsi</h1>
        <div className="space-x-6">
          <ScrollLink href="#gallery">Gallery</ScrollLink>
          <ScrollLink href="#about">About</ScrollLink>
          <ScrollLink href="#contact">Contact</ScrollLink>
        </div>
      </nav>
    </header>
  );
}
