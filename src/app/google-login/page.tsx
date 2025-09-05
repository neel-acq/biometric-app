"use client";

import Script from "next/script";
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
          client_id: process.env.GOOGLE_CLIENT_ID!,
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
    <>
      <Script id="openwidget" strategy="afterInteractive">
        {`
          window.__ow = window.__ow || {};
          window.__ow.organizationId = "bbdf4abf-531a-464e-b037-424c406966c9";
          window.__ow.template_id = "5bacf1e9-7bfd-4cc5-a860-14a7ad6b2cf7";
          window.__ow.integration_name = "manual_settings";
          window.__ow.product_name = "chatbot";
          (function(n,t,c){
            function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}
            var e={_q:[],_h:null,_v:"2.0",
              on:function(){i(["on",c.call(arguments)])},
              once:function(){i(["once",c.call(arguments)])},
              off:function(){i(["off",c.call(arguments)])},
              get:function(){
                if(!e._h)throw new Error("[OpenWidget] You can't use getters before load.");
                return i(["get",c.call(arguments)])},
              call:function(){i(["call",c.call(arguments)])},
              init:function(){
                var n=t.createElement("script");
                n.async=!0;
                n.type="text/javascript";
                n.src="https://cdn.openwidget.com/openwidget.js";
                t.head.appendChild(n)}};
            !n.__ow.asyncInit&&e.init(),n.OpenWidget=n.OpenWidget||e
          }(window,document,[].slice));
        `}
      </Script>

      <noscript>
        You need to{" "}
        <a
          href="https://www.chatbot.com/help/chat-widget/enable-javascript-in-your-browser/"
          rel="noopener nofollow"
        >
          enable JavaScript
        </a>{" "}
        in order to use the AI chatbot tool powered by{" "}
        <a
          href="https://www.chatbot.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          ChatBot
        </a>
      </noscript>
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-xl font-bold">Google Login Demo</h1>
        <div ref={buttonDiv}></div>
      </div>
    </>
  );
}
