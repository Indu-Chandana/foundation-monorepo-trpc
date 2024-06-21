'use client'

import React from 'react'
import { userFormSignIn } from '@foundation-trpc/forms/src/signin'
// import { trpcClient } from "@foundation-trpc/trpc-client/src/client"
import { signIn } from 'next-auth/react'

type Props = {}

const SignIn = (props: Props) => {
  // const {mutateAsync} = trpcClient.auth.signIn.useMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = userFormSignIn()

  return (
    <form
      onSubmit={handleSubmit(async ({ email, password }) => {
        signIn('credentials', {
          email,
          password,
          callbackUrl: '/',
        })
      })}
    >
      <input placeholder="email" {...register('email')} />
      <input placeholder="password" {...register('password')} type="password" />
      <button type="submit">Submit</button>

      <div>
        <button onClick={() => signIn('google', { callbackUrl: '/' })}>
          Google
        </button>
      </div>
    </form>
  )
}

export default SignIn
