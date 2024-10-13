'use client'; // Ensure this is a client component

import { SessionProvider } from 'next-auth/react';

export function SessionProviderWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
