'use client'
import { userFormSignIn } from '@foundation-trpc/forms/src/signin'
// import { trpcClient } from "@foundation-trpc/trpc-client/src/client"
import { signIn } from 'next-auth/react'
import { AuthLayout } from '../organisms/AuthLayout'
import { Label } from '../atoms/label'
import { Button } from '../atoms/button'
import { Input } from '../atoms/input'

import Link from 'next/link'

const SignIn = () => {
  // const {mutateAsync} = trpcClient.auth.signIn.useMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = userFormSignIn()
  console.log('errror', errors)
  return (
    <AuthLayout title="Sign In">
      <form
        onSubmit={handleSubmit(async ({ email, password }) => {
          signIn('credentials', {
            email,
            password,
            callbackUrl: '/',
          })
        })}
      >
        <Label title="Email" error={errors.email?.message}>
          <Input placeholder="email" {...register('email')} />
        </Label>
        <Label title="Password" error={errors.password?.message}>
          <Input
            placeholder="password"
            {...register('password')}
            type="password"
          />
        </Label>

        <Button type="submit">Submit</Button>
      </form>

      <div className="mt-12">
        Sign in with{' '}
        <button
          className="underline underline-offset-8"
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          Google
        </button>
        <div className="mt-4">
          <Link href={'/register'}>Register</Link>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignIn
