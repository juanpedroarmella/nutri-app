import { Button } from '@/common/components/ui/button'
import { Card, CardContent } from '@/common/components/ui/card'
import { AuthRoutes } from '@/common/types/routes.types'
import {
  Apple,
  ClipboardList,
  Users,
  LineChart,
  FileText,
  MessageSquare
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className='flex-1 my-10'>
      <section className='py-20 bg-gradient-to-b from-primary/10 to-background rounded-lg mt-10'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>
                Nutrición Profesional Personalizada
              </h1>
              <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                Accede a tu información nutricional y seguimiento personalizado
                de manera fácil y segura
              </p>
            </div>
            <div className='space-x-4'>
              <Button asChild size='lg'>
                <Link href={AuthRoutes.SIGN_IN}>Acceder a mi cuenta</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className='py-20 container px-4 md:px-6'>
        <h2 className='text-3xl font-bold text-center mb-12'>
          Beneficios para tu salud
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <FeatureCard
            icon={<ClipboardList className='h-10 w-10 text-primary' />}
            title='Historia Clínica'
            description='Accede a tu historial nutricional y seguimiento de manera segura'
          />
          <FeatureCard
            icon={<FileText className='h-10 w-10 text-primary' />}
            title='Documentos'
            description='Visualiza tus planes nutricionales y documentos importantes'
          />
          <FeatureCard
            icon={<LineChart className='h-10 w-10 text-primary' />}
            title='Progreso'
            description='Monitorea tu evolución y logros en el tiempo'
          />
          <FeatureCard
            icon={<MessageSquare className='h-10 w-10 text-primary' />}
            title='Comunicación'
            description='Mantente conectado con tu nutricionista de forma directa'
          />
        </div>
      </section>

      <section className='py-16 bg-gradient-to-b from-background to-primary/10 rounded-lg mb-4'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center space-y-4 text-center'>
            <h2 className='text-3xl font-bold'>
              Comienza tu viaje hacia una mejor salud
            </h2>
            <p className='text-gray-500 dark:text-gray-400 max-w-[600px]'>
              Accede a tu portal personalizado y mantente al día con tu plan
              nutricional
            </p>
            <Button asChild size='lg'>
              <Link href={AuthRoutes.SIGN_IN}>Ingresar al portal</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

function FeatureCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card>
      <CardContent className='flex flex-col items-center text-center p-6 space-y-4'>
        {icon}
        <h3 className='font-bold'>{title}</h3>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
