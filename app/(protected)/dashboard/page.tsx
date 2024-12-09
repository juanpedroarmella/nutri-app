import { AuthRoutes } from '@/common/types/routes.types'
import { userService } from '@/features/users/service/user.service'
import { InfoIcon } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const user = await userService.getCurrentUser()

  if (!user) {
    return redirect(AuthRoutes.SIGN_IN)
  }

  return (
    <div className='flex-1 w-full flex flex-col items-center gap-12 p-4'>
      <div className='bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center'>
        <InfoIcon size='16' strokeWidth={2} />
        Esta es una página protegida que solo puedes ver como usuario
        autenticado
      </div>

      <div className='flex flex-col gap-2 items-start'>
        <h2 className='font-bold text-2xl mb-4'>Detalles de tu usuario</h2>
        <pre className='text-xs font-mono p-3 rounded border max-h-64 overflow-auto'>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  )
}
