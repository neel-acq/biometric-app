"use client";
import Script from "next/script";
import { useEffect } from "react";

export default function ContactForm() {
  useEffect(() => {
    // Cloudflare Turnstile will auto-render based on className
   
  }, []);

  return (
    <>
      <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
      <form method="POST" action="#">
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />

        {/* Cloudflare checkbox */}
        <div
          className="cf-turnstile"
          data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          ></div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
