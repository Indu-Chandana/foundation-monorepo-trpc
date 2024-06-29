import Link from 'next/link'
import { cn } from '../../utils'
import { DeveloperInfo } from './DeveloperInfo'

export const Brand = () => {
  return (
    <div>
      <Link href={'/'} className={cn('hover:underline underline-offset-4')}>
        Foundation TRPC
      </Link>
      <DeveloperInfo />
    </div>
  )
}
