'use client';

import { SignUp } from '@clerk/clerk-react';

export default function SignUpPage() {
  return (
    <div style={{ display:'grid', placeItems:'center', minHeight:'100dvh' }}>
      <SignUp
        // After registering a passkey, go sign in (or straight to success)
        afterSignUpUrl="/sign-in"
        routing="path"
        path="/sign-up"
      />
    </div>
  );
}
