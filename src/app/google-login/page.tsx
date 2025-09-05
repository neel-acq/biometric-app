"use client";

import { useEffect, useRef } from "react";

// Add a global type declaration for window.google
declare global {
  interface Window {
    google?: any;
  }
}

export default function GoogleLoginPage() {
  const buttonDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Google Identity script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google && buttonDiv.current) {
        // Initialize button
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: handleResponse,
        });

        window.google.accounts.id.renderButton(buttonDiv.current, {
          theme: "outline",
          size: "large",
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  const handleResponse = (response: any) => {
    // response.credential is a JWT (ID token)
    const base64Url = response.credential.split(".")[1];
    const decoded = JSON.parse(atob(base64Url));
    console.log("Decoded user info:", decoded);

    alert(`Welcome ${decoded.name} (${decoded.email})`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-xl font-bold">Google Login Demo</h1>
      <div ref={buttonDiv}></div>
    </div>
  );
}
