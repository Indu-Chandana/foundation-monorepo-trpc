'use client'
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react' // next-auth import as a peer dep.

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}
