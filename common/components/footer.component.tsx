import { ThemeSwitcher } from './theme-switcher.component'

export function Footer() {
  return (
    <footer className='w-full relative flex items-center justify-between border-t text-center text-xs gap-4 py-4 px-6'>
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
  )
}
