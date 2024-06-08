'use client'
import { zodResolver } from '@hookform/resolvers/zod' // it allows to work together with zod and react-hook-form
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formSchemaRegister } from './schemas'

export type FormTypeRegister = z.infer<typeof formSchemaRegister>
// const formreg: FormTypeRegister = {
//     email: '', password: ''
// }

export const userFormRegister = () =>
  useForm<FormTypeRegister>({ resolver: zodResolver(formSchemaRegister) })
// const {setError,setValue} = userFormRegister()
