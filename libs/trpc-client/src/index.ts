import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { AppRouter } from '@foundation-trpc/trpc-server/routers'

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: 'http://localhost:8080/trpc' })],
})

// const users = trpc.auth.users.query()
