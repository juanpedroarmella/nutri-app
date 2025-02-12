import { Footer } from '@/common/components/footer.component'
import { MainNav } from '@/common/components/main-nav.component'
import { Toaster } from '@/common/components/ui/toaster'
import { EnvVariables } from '@/common/utils/env.utils'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import { Providers } from './providers'

const defaultUrl = EnvVariables.nextPublicAppUrl

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Nutrición Profesional',
  description: 'Portal de nutrición profesional personalizada',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es' className={GeistSans.className} suppressHydrationWarning>
      <body className='bg-background text-foreground'>
        <Providers>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <div className='min-h-screen flex flex-col'>
              <MainNav />
              <main className='flex-1 flex items-start justify-center mt-[60px]'>
                <div className='w-full max-w-7xl mx-auto sm:px-4'>
                  {children}
                </div>
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
