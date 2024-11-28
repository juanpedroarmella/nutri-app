'use client'
import GoogleIcon from '@/common/icons/google.icon'
import { Button } from '@/common/components/ui/button'
import { FC } from 'react'
import { createClient } from '@/common/utils/supabase/client'
import { useToast } from '@/common/hooks/use-toast'

const GoogleAuthButton: FC = () => {
  const supabase = createClient()
  const { toast } = useToast()

  const handleGoogleAuth = async () => {
    try {
      supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
    } catch (error) {
      console.error('Error during Google authentication:', error)
      toast({
        variant: 'destructive',
        title: 'Error de autenticación',
        description: 'Hubo un problema al intentar iniciar sesión con Google'
      })
    }
  }

  return (
    <Button
      onClick={handleGoogleAuth}
      variant='outline'
      size='lg'
      type='button'
      className='w-full font-normal gap-4'>
      <GoogleIcon width={20} height={20} />
      Continuar con Google
    </Button>
  )
}

export default GoogleAuthButton
