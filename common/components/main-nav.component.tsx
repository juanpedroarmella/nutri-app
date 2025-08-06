import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { hasEnvVars } from '../utils/supabase/check-env-vars'
import { EnvVarWarning } from './env-var-warning'
import HeaderAuth from './header-auth'
import { UserCardSkeleton } from './user-card-skeleton.component'

export function MainNav() {
  return (
    <nav className='w-full fixed top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center border-b border-b-foreground/10 h-16'>
      <div className='w-full flex justify-between items-center py-1 sm:px-16 px-2 text-sm max-w-7xl mx-auto gap-6'>
        <Link
          href={'/'}
          className='h-full w-[132px] relative'
        >
          <Image src='/logo.svg' alt='Main Logo' fill className='rounded-br-[24px]' objectFit='contain'/>
        </Link>
        {!hasEnvVars ? (
          <EnvVarWarning />
        ) : (
          <Suspense fallback={<UserCardSkeleton />}>
            <HeaderAuth />
          </Suspense>
        )}
      </div>
    </nav>
  )
}
