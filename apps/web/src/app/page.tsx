// ------------- we can use this commented code without using the provider wrapper in the 'layout.tsx' -------------

// import { trpc } from '@foundation-trpc/trpc-client/src'

// export default async function Home() {

//   const users = await trpc.auth.users.query()

//   return <main>Hello {JSON.stringify(users)}</main>
// }

'use client'

import { trpcClient } from '@foundation-trpc/trpc-client/src/client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { HomePage } from '@foundation-trpc/ui/src/components/templates/HomePage'

export default function Home() {
  const { isLoading, data } = trpcClient.auth.users.useQuery()
  const { data: userData } = useSession()

  return (
    <main>
      {/* Hello {JSON.stringify(data)} */}

      {/* <div>
        {userData?.user ? (
          <button onClick={() => signOut()}>signOut</button>
        ) : (
          <Link href="/signIn">Sign In</Link>
        )}
      </div> */}

      <HomePage />
    </main>
  )
}
