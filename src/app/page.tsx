'use client';

import { useState } from 'react';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

function randomChallenge(length = 32): Uint8Array {
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  return randomValues;
}

function toBase64URL(buffer: Uint8Array): string {
  return btoa(String.fromCharCode(...buffer))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

export default function FingerprintDemo() {
  const [log, setLog] = useState('');

  const register = async () => {
    try {
      const challenge = toBase64URL(randomChallenge());

      const regResp = await startRegistration({
        optionsJSON: {
          challenge,
          rp: { name: 'Demo RP', id: window.location.hostname },
          user: {
            id: toBase64URL(new TextEncoder().encode('user-id-123')),
            name: 'me@example.com',
            displayName: 'Neel',
          },
          pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
          authenticatorSelection: {
            authenticatorAttachment: 'platform', // ✅ Force Touch ID
            userVerification: 'required',
          },
        },
      });

      setLog('✅ Registration Success:\n' + JSON.stringify(regResp, null, 2));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setLog('❌ Registration error: ' + err.message);
      } else {
        setLog('❌ Registration error: ' + String(err));
      }
    }
  };

  const login = async () => {
    try {
      const challenge = toBase64URL(randomChallenge());

      const authResp = await startAuthentication({
        optionsJSON: {
          challenge,
          rpId: window.location.hostname,
          allowCredentials: [],
          userVerification: 'required',
        },
      });

      setLog('✅ Auth Success:\n' + JSON.stringify(authResp, null, 2));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setLog('❌ Login error: ' + err.message);
      } else {
        setLog('❌ Login error: ' + String(err));
      }
    }
  };

  return (
    <main className="p-6">
      <button
        onClick={register}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Register (Touch ID)
      </button>
      <button
        onClick={login}
        className="p-2 bg-green-500 text-white rounded ml-2"
      >
        Login (Touch ID)
      </button>
      <pre className="bg-gray-100 p-4 mt-4 rounded text-sm overflow-auto">
        {log}
      </pre>
    </main>
  );
}
