'use client';

import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
  return (
    <div style={{ display:'grid', placeItems:'center', minHeight:'100dvh' }}>
      <SignIn
        // After success, go to our custom Success page
        afterSignInUrl="/success"
        // Optional: keep it on this route
        routing="path"
        path="/sign-in"
      />
    </div>
  );
}
