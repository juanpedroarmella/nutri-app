import { APP_NAME } from '../constants/app.constants'
import { hasEnvVars } from '../utils/supabase/check-env-vars'
import DeployButton from './deploy-button'
import { EnvVarWarning } from './env-var-warning'
import HeaderAuth from './header-auth'
import Link from 'next/link'

export function MainNav() {
  return (
    <nav className='w-full fixed top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center border-b border-b-foreground/10 h-16'>
      <div className='w-full flex justify-between items-center p-3 px-5 text-sm max-w-7xl mx-auto'>
        <div className='flex gap-5 items-center font-semibold'>
          <Link href={'/'}>{APP_NAME}</Link>
          <div className='flex items-center gap-2'>
            <DeployButton />
          </div>
        </div>
        {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
      </div>
    </nav>
  )
}
