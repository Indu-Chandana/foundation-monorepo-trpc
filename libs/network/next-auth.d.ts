import type { DefaultSession } from 'next-auth'
// import default session from node-modules and add |uid| to it. because we need to add uid. authOptions.ts
declare module 'next-auth' {
  interface Session {
    user?: DefaultSession['user'] & { uid: string }
  }
}
