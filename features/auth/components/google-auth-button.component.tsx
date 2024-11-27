'use client'
import GoogleIcon from '@/common/icons/google.icon'
import { Button } from '@/common/components/ui/button'
import { FC } from 'react'
import { createClient } from '@/common/utils/supabase/client'

const GoogleAuthButton: FC = () => {
  const supabase = createClient()

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
