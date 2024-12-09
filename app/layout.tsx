import { Toaster } from '@/common/components/ui/toaster'
import { APP_DESCRIPTION, APP_NAME } from '@/common/constants/app.constants'
import { EnvVariables } from '@/common/utils/env.utils'
import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import { MainNav } from '@/common/components/main-nav.component'
import { Footer } from '@/common/components/footer.component'

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
            <MainNav />
            <div className='flex-1 flex flex-col items-center pt-16 w-full h-full justify-between max-w-7xl mx-auto'>
              {children}
            </div>
            <Footer />
          </main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
