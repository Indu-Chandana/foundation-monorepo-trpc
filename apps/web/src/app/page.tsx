// ------------- we can use this commented code without using the provider wrapper in the 'layout.tsx' -------------

// import { trpc } from '@foundation-trpc/trpc-client/src'

// export default async function Home() {

//   const users = await trpc.auth.users.query()

//   return <main>Hello {JSON.stringify(users)}</main>
// }

'use client'

import { trpcClient } from '@foundation-trpc/trpc-client/src/client'

export default function Home() {
  const { isLoading, data } = trpcClient.auth.users.useQuery()

  return <main>Hello {JSON.stringify(data)}</main>
}
