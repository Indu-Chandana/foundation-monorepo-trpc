'use client'

import React from 'react'
import { userFormRegister } from '@foundation-trpc/forms/src/register'
import { trpcClient } from '@foundation-trpc/trpc-client/src/client'
import { signIn } from 'next-auth/react'

type Props = {}

const Register = (props: Props) => {
  const { mutateAsync } = trpcClient.auth.registerWithCredentials.useMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = userFormRegister()

  console.log('errors ::', errors)
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        console.log('data', data)
        const user = await mutateAsync(data)
        console.log('user', user)

        if (user?.user) {
          signIn('credentials', {
            email: data.email,
            password: data.password,
            callbackUrl: '/',
          })
        }
      })}
    >
      <input placeholder="email" {...register('email')} />
      <input placeholder="password" {...register('password')} type="password" />
      <input placeholder="name" {...register('name')} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default Register
