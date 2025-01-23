'use client'
import { Spinner } from '@/common/components/spinner.component'
import { SubmitButton } from '@/common/components/submit-button'
import { Card, CardContent, CardHeader } from '@/common/components/ui/card'
import { Input } from '@/common/components/ui/input'
import { Label } from '@/common/components/ui/label'
import { useToast } from '@/common/hooks/use-toast'
import { signInAction } from '@/features/auth/actions/sing-in.action'
import GoogleAuthButton from '@/features/auth/components/google-auth-button.component'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

function LoginContent() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const error = searchParams?.get('error') ?? null

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        toast({
          variant: 'destructive',
          title: 'Error de autenticación',
          description: error
        })
      }, 0)

      return () => clearTimeout(timeout)
    }
  }, [error, toast])

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const result = await signInAction(formData)
    if (result.type === 'error') {
      toast({
        variant: 'destructive',
        title: 'Error de inicio de sesión',
        description: result.message
      })
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <Card className='w-full max-w-[500px] min-w-[256px] mx-auto'>
        <CardHeader>
          <h1 className='text-2xl font-medium'>Iniciar sesión</h1>
        </CardHeader>
        <CardContent>
          <form className='flex flex-col gap-4' onSubmit={handleSignIn}>
            <div className='space-y-2'>
              <Label htmlFor='email'>Correo electrónico</Label>
              <Input name='email' placeholder='tu@email.com' required />
            </div>
            <div className='space-y-2'>
              <div className='flex justify-between items-center'>
                <Label htmlFor='password'>Contraseña</Label>
                <Link
                  className='text-xs text-muted-foreground hover:text-primary'
                  href='/forgot-password'
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input
                type='password'
                name='password'
                placeholder='Tu contraseña'
                required
              />
            </div>
            <SubmitButton pendingText='Iniciando sesión...' className='w-full'>
              Iniciar sesión
            </SubmitButton>
            <GoogleAuthButton />
          </form>
        </CardContent>
      </Card>

      <div className='w-full max-w-[500px] min-w-[256px] mx-auto text-center'>
        <p className='text-sm text-muted-foreground'>
          Para acceder al sistema, necesitas estar registrado por un administrador.
          <br />
          Si aún no tienes una cuenta, por favor contacta con tu administrador.
        </p>
      </div>
    </div>
  )
}

export default function Login() {
  return (
    <Suspense fallback={<Spinner />}>
      <LoginContent />
    </Suspense>
  )
}