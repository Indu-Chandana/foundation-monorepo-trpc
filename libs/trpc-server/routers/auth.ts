import { privateProcedure, publicProcedure, router } from '../trpc'

import { prisma } from '@foundation-trpc/db'

export const authRoutes = router({
  users: privateProcedure.query(({ ctx }) => prisma.user.findMany()),
})
