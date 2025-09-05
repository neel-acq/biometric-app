"use client";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function ContactForm() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Expose a global callback for Cloudflare Turnstile
  useEffect(() => {
    (window as any).onTurnstileSuccess = function (token: string) {
      setCaptchaToken(token);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />

      <form
        method="POST"
        action="#"
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Contact Us
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        {/* Cloudflare Turnstile */}
        <div
          className="cf-turnstile"
          data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          data-callback="onTurnstileSuccess"
        ></div>

        <button
          type="submit"
          disabled={!captchaToken}
          className={`w-full py-2 rounded-lg text-white font-semibold transition ${
            captchaToken
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
