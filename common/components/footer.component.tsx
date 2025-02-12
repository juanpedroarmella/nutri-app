import Link from 'next/link'
import { ThemeSwitcher } from './theme-switcher.component'
import { Instagram, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className='w-full relative flex flex-col sm:flex-row items-center justify-between border-t text-center text-[10px] gap-4 py-4 px-6 text-muted-foreground'>
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

      <nav className='flex gap-4'>
        <Link href="/privacy" className="hover:underline">
          Política de Privacidad
        </Link>
        <Link href="/terms" className="hover:underline">
          Términos y Condiciones
        </Link>
      </nav>

      <div className='flex items-center'>
        <a
          href='https://wa.me/5492396440232'
          target='_blank'
          rel='noreferrer'
          className='hover:text-primary transition-colors px-4'
        >
          <Phone className='w-4 h-4' />
        </a>
        <a
          href='https://instagram.com/nutricion.rominalasca'
          target='_blank'
          rel='noreferrer'
          className='hover:text-primary transition-colors px-4'
        >
          <Instagram className='w-4 h-4' />
        </a>
        <ThemeSwitcher />
      </div>
    </footer>
  )
}
