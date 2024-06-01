import { TRPCError } from '@trpc/server'
import { t } from './trpc'
// import { Role } from "./types";
import { JwtPayload, verify } from 'jsonwebtoken'

// first: authentication part
export const isAuthed = () =>
  //...roles: Role[]
  t.middleware(async (opts) => {
    const { token } = opts.ctx
    if (!token) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Token not found.',
      })
    }

    console.log('token ::', token)

    let uid

    try {
      const user = await verify(token, process.env.NEXTAUTH_SECRET || '')
      console.log('process.env.NEXTAUTH_SECRET ::', process.env.NEXTAUTH_SECRET)

      uid = (user as JwtPayload).uid
      console.log('uid ::', uid)
    } catch (error) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Invalid token',
      })
    }
    return opts.next({ ...opts, ctx: { ...opts.ctx, uid } })
  })
