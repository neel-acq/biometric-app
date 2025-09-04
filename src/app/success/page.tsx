'use client';

import { useUser, SignedIn, SignedOut } from '@clerk/clerk-react';
import Link from 'next/link';

export default function Success() {
  const { user } = useUser();

  return (
    <main style={{ display:'grid', placeItems:'center', minHeight:'100dvh', textAlign:'center' }}>
      <SignedIn>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 8 }}>🎉 Login successful</h1>
          <p>Welcome{user?.firstName ? `, ${user.firstName}` : ''}! You’ve signed in (likely via passkey/biometric if you selected it).</p>
          <Link href="/">Go to Home</Link>
        </div>
      </SignedIn>

      <SignedOut>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 8 }}>⚠️ Not signed in</h1>
          <p>Please try again.</p>
          <Link href="/sign-in">Back to Sign In</Link>
        </div>
      </SignedOut>
    </main>
  );
}
