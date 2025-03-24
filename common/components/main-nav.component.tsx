import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { hasEnvVars } from '../utils/supabase/check-env-vars'
import { EnvVarWarning } from './env-var-warning'
import HeaderAuth from './header-auth'
import { UserCardSkeleton } from './user-card-skeleton.component'

export function MainNav() {
  return (
    <nav className='w-full fixed top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center border-b border-b-foreground/10 h-20'>
      <div className='w-full flex justify-between items-center p-3 py-0 px-16 text-sm max-w-7xl mx-auto gap-6'>
        <Link
          href={'/'}
          className='h-[75%] w-40 relative'
        >
          <Image src='/logo.svg' alt='Main Logo' fill className='rounded-2xl'/>
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
