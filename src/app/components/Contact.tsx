"use client";

import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Sending…");
    // Replace with your Formspree/EmailJS/endpoint:
    setTimeout(() => setStatus("Message sent!"), 600);
  }

  return (
    <section id="contact" className="mx-auto max-w-3xl px-4 py-20">
      <h2 className="text-3xl font-serif mb-6 text-[#3C5A72]">Contact</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your name"
          className="w-full rounded-xl border p-3"
          required
        />
        <input
          type="email"
          placeholder="Your email"
          className="w-full rounded-xl border p-3"
          required
        />
        <textarea
          placeholder="Your message"
          className="w-full rounded-xl border p-3 h-32"
          required
        />
        <button
          className="rounded-xl bg-[#7B5E3B] text-white px-6 py-3 hover:opacity-95"
          type="submit"
        >
          Send
        </button>
      </form>
      {status && <p className="mt-4 text-sm text-green-700">{status}</p>}
    </section>
  );
}
