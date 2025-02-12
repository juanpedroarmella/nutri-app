import { ThemeSwitcher } from './theme-switcher.component'
import { Instagram, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className='w-full relative flex items-center justify-between border-t text-center text-[10px] gap-4 py-4 px-6 text-muted-foreground'>
      <div className='flex items-center gap-4'>
        <p>
          © {new Date().getFullYear()} • Powered by{' '}
          <a
            href='https://linkedin.com/in/juanpedroarmella'
            target='_blank'
            className='font-bold hover:underline'
            rel='noreferrer'
          >
            Juan Pedro Armella
          </a>
        </p>
      </div>

      <div className='flex items-center gap-4'>
        <a
          href='https://wa.me/5492396440232'
          target='_blank'
          rel='noreferrer'
          className='flex items-center gap-1 hover:text-primary transition-colors mr-2'
        >
          <Phone className='h-4 w-4 text-muted-foreground hover:text-primary' />
        </a>
        <a
          href='https://www.instagram.com/lic.rominalasca/'
          target='_blank'
          rel='noreferrer'
          className='flex items-center gap-1 hover:text-primary transition-colors'
        >
          <Instagram className='h-4 w-4 text-muted-foreground hover:text-primary' />
        </a>
        <ThemeSwitcher />
      </div>
    </footer>
  )
}
