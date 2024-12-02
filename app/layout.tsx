import DeployButton from '@/common/components/deploy-button'
import { EnvVarWarning } from '@/common/components/env-var-warning'
import HeaderAuth from '@/common/components/header-auth'
import { ThemeSwitcher } from '@/common/components/theme-switcher'
import { Toaster } from '@/common/components/ui/toaster'
import { APP_DESCRIPTION, APP_NAME } from '@/common/constants/app.constants'
import { EnvVariables } from '@/common/utils/env.utils'
import { hasEnvVars } from '@/common/utils/supabase/check-env-vars'
import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from 'next-themes'
import Link from 'next/link'
import './globals.css'

const defaultUrl = EnvVariables.nextPublicAppUrl

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: `${APP_NAME}`,
  description: APP_DESCRIPTION
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={GeistSans.className} suppressHydrationWarning>
      <body className='bg-background text-foreground'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <main className='min-h-screen flex flex-col'>
            <div className='flex flex-col justify-between min-h-screen w-full'>
              <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
                <div className='w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm'>
                  <div className='flex gap-5 items-center font-semibold'>
                    <Link href={'/'}>{APP_NAME}</Link>
                    <div className='flex items-center gap-2'>
                      <DeployButton />
                    </div>
                  </div>
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>
              <div className='flex-1 flex flex-col items-center justify-start'>
                <div className='flex flex-col gap-20 max-w-5xl p-5 w-full'>
                  {children}
                </div>
              </div>

              <footer className='w-full flex items-center justify-between border-t mx-auto text-center text-xs gap-4 py-4 px-6'>
                <p>
                  Powered by{' '}
                  <a
                    href='https://linkedin.com/in/juanpedroarmella'
                    target='_blank'
                    className='font-bold hover:underline'
                    rel='noreferrer'
                  >
                    Juan Pedro Armella
                  </a>
                </p>
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
