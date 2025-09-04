import './globals.css';
import Providers from './providers';

export const metadata = { title: 'Passkey Demo', description: 'Fingerprint login (WebAuthn) with Clerk' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
