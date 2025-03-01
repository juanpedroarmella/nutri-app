import { APP_NAME } from '../constants/app.constants'
import { hasEnvVars } from '../utils/supabase/check-env-vars'
import { EnvVarWarning } from './env-var-warning'
import HeaderAuth from './header-auth'
import Link from 'next/link'
import { Suspense } from 'react'
import { UserCardSkeleton } from './user-card-skeleton.component'
import Image from 'next/image'

export function MainNav() {
  return (
    <nav className='w-full fixed top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center border-b border-b-foreground/10 h-16'>
      <div className='w-full flex justify-between items-center p-3 px-5 text-sm max-w-7xl mx-auto'>
        <Link
          href={'/'}
          className='text-lg text-primary font-normal flex gap-1 items-center'
        >
          <Image src='/logo.svg' alt='Main Logo' width={34} height={34} />
          {APP_NAME}
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
