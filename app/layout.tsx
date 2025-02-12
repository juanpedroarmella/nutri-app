import { Footer } from '@/common/components/footer.component'
import { MainNav } from '@/common/components/main-nav.component'
import { Toaster } from '@/common/components/ui/toaster'
import { EnvVariables } from '@/common/utils/env.utils'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import { Providers } from './providers'
import { APP_NAME, APP_DESCRIPTION } from '@/common/constants/app.constants'

const defaultUrl = EnvVariables.nextPublicAppUrl

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`
  },
  description: APP_DESCRIPTION,
  keywords: [
    'nutrición',
    'salud',
    'planes nutricionales',
    'seguimiento nutricional',
    'nutricionista',
    'Romina Lasca'
  ],
  authors: [{ name: 'Romina Lasca' }],
  creator: 'Romina Lasca',
  publisher: 'Romina Lasca',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: defaultUrl,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Logo Nutrición Profesional - Romina Lasca'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: ['/logo.png']
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png'
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
