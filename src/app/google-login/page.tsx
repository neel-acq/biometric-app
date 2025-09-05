"use client";

import { useEffect, useRef } from "react";

export interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: { theme: string; size: string }
          ) => void;
        };
      };
    };
  }
}

export default function GoogleLoginPage() {
  const buttonDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google && buttonDiv.current) {
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

  const handleResponse = (response: GoogleCredentialResponse) => {
    // response.credential is a JWT ID token
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
