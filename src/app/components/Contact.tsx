"use client";

import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    setTimeout(() => setStatus("Message sent!"), 1000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-serif mb-6">Contact</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border border-gray-300 rounded-lg p-3"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border border-gray-300 rounded-lg p-3"
          required
        />
        <textarea
          placeholder="Your Message"
          className="w-full border border-gray-300 rounded-lg p-3 h-32"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
        >
          Send Message
        </button>
      </form>
      {status && <p className="mt-4 text-green-600">{status}</p>}
    </div>
  );
}
