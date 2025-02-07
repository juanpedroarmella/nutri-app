'use client'
import GoogleIcon from '@/common/icons/google.icon'
import { Button } from '@/common/components/ui/button'
import { FC } from 'react'
import { createClient } from '@/common/utils/supabase/client'
import { useToast } from '@/common/hooks/use-toast'
import { AuthRoutes } from '@/common/types/routes.types'
import { EnvVariables } from '@/common/utils/env.utils'

const GoogleAuthButton: FC = () => {
  const supabase = createClient()
  const { toast } = useToast()

  const handleGoogleAuth = async () => {
    try {
      const redirectUrl = EnvVariables.nextPublicAppUrl || window.location.origin
      
      supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${redirectUrl}${AuthRoutes.CALLBACK}`,
          queryParams: {
            redirect_to: '/dashboard'
          }
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
