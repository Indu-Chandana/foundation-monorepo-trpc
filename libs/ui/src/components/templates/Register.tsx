'use client'

import { userFormRegister } from '@foundation-trpc/forms/src/register'
import { trpcClient } from '@foundation-trpc/trpc-client/src/client'
import { signIn } from 'next-auth/react'
import { AuthLayout } from '../organisms/AuthLayout'
import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'

import Link from 'next/link' // next impoted as a peer dependency

const Register = () => {
  const { mutateAsync } = trpcClient.auth.registerWithCredentials.useMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = userFormRegister()

  console.log('errors ::', errors)
  return (
    <AuthLayout title="Register">
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
        <Label title="Name" error={errors.name?.message}>
          <Input placeholder="name" {...register('name')} />
        </Label>
        <Button type="submit">Submit</Button>
      </form>

      <div className="mt-12">
        Continue with{' '}
        <button
          className="underline underline-offset-8"
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          Google
        </button>
        <div className="mt-4">
          <Link href={'/signIn'}>Login</Link>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Register
