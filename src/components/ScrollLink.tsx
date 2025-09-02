"use client";
import { MouseEvent } from "react";

interface Props {
  href: string;
  children: React.ReactNode;
}

export default function ScrollLink({ href, children }: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <a href={href} onClick={handleClick} className="hover:underline">
      {children}
    </a>
  );
}
