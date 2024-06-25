import { TRPCError } from '@trpc/server'
import { Role } from './types'
import { prisma } from '@foundation-trpc/db'

// export const userHasRequiredRole = async (
//   uid: string,
//   requiredRole: Role,
// ): Promise<boolean> => {
//   let userExists

//   switch (requiredRole) {
//     case 'admin':
//       userExists = await prisma.admin.findUnique({
//         where: { uid },
//       })
//       break
//     case 'manager':
//       userExists = await prisma.manager.findUnique({
//         where: { uid },
//       })
//       break
//   }
//   return Boolean(userExists)
// }

export const getUserRoles = async (uid: string): Promise<Role[]> => {
  const [adminExists, managerExists] = await Promise.all([
    prisma.admin.findUnique({ where: { uid } }),
    prisma.manager.findUnique({ where: { uid } }),
  ])
  const roles: Role[] = []

  if (adminExists) roles.push('admin')
  if (managerExists) roles.push('manager')
  return roles
}

export const authorizeUser = async (
  uid: string,
  roles: Role[],
): Promise<void> => {
  if (!roles || roles.length === 0) {
    return // No specific roles required, access is granted
  }
  const userRoles = await getUserRoles(uid)
  if (!userRoles.some((role) => roles.includes(role))) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'User does not have the requires role(s).',
    })
  }
  // const roleCheckPromises = roles.map((role) => userHasRequiredRole(uid, role))
  // const roleCheckResults = await Promise.all(roleCheckPromises)
  // if (!roleCheckResults.some(Boolean)) {
  //   throw new TRPCError({
  //     code: 'FORBIDDEN',
  //     message: 'User does not have the required role.',
  //   })
  // }
  // return
}

// export const checkRowLevelPermission = async (
//   uid: string,
//   allowedUid: string | string[],
//   allowedRoles: Role[] = ['admin']
// ) => {
//   const userRoles = await getUserRoles(uid)

//   if (userRoles?.some((role) => allowedRoles.includes(role))) {
//     return true // no more needs, directly return it.
//   }

//   const uids = typeof allowedUid === 'string' ? [allowedUid] : allowedUid.filter(Boolean) // Using filter to remove falsy values

//   // Original array with various elements
//   // let allowedUid = [1, 0, "hello", "", undefined, "world", false, 42, null];

//   // Using filter to remove falsy values
//   // let filteredArray = allowedUid.filter(Boolean);

//   // console.log(filteredArray);
//   // Output: [1, "hello", "world", 42]

//   if (!uids.includes(uid)) {
//     throw new TRPCError({
//       code: 'FORBIDDEN',
//       message: 'You are not allowed to do this action.'
//     })
//   }

// }
