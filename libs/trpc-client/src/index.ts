import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { AppRouter } from '@foundation-trpc/trpc-server/routers'

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8080/trpc',
      async headers() {
        return {
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJpbmR1In0.h01XWYaoXu47d3xxWbLl7UMmD5Ls-b2g_Qkz33qXc-E`,
        }
      },
    }),
  ],
})

// const users = trpc.auth.users.query()
