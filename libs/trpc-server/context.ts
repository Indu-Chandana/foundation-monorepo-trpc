import { CreateExpressContextOptions } from '@trpc/server/adapters/express'

export const createTRPCContext = ({
  req,
  res,
}: CreateExpressContextOptions) => {
  const header = req.headers.authorization
  const token = header?.split(' ')[1]
  // Bearer k32ek2f
  return { req, res, token }
}

// we use that another places to get exact same return type.
export type ITRPCContext = Awaited<ReturnType<typeof createTRPCContext>>
