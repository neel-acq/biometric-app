'use client';

import { ClerkProvider } from '@clerk/clerk-react';

const pk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY! || 'pk_test_cHJvZm91bmQtaG9yc2UtODYuY2xlcmsuYWNjb3VudHMuZGV2JA';

export default function Providers({ children }: { children: React.ReactNode }) {
  if (!pk) {
    console.warn('Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY');
  }
  return <ClerkProvider publishableKey={pk}>{children}</ClerkProvider>;
}
