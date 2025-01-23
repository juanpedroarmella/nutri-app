import { Button } from '@/common/components/ui/button'
import { Card, CardContent } from '@/common/components/ui/card'
import { AuthRoutes } from '@/common/types/routes.types'
import { Apple, ClipboardList, Users, LineChart } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className='flex-1'>
      {/* Hero Section */}
      <section className='py-20 bg-gradient-to-b from-primary/10 to-background'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>
                Gestión Nutricional Profesional
              </h1>
              <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                Simplifica el seguimiento de tus pacientes y optimiza tu práctica nutricional con nuestra plataforma integral
              </p>
            </div>
            <div className='space-x-4'>
              <Button asChild size='lg'>
                <Link href={AuthRoutes.SIGN_IN}>Comenzar ahora</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16 container px-4 md:px-6'>
        <h2 className='text-3xl font-bold text-center mb-12'>
          Características Principales
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <FeatureCard
            icon={<Users className='h-10 w-10 text-primary' />}
            title='Gestión de Pacientes'
            description='Administra fácilmente los perfiles y datos de tus pacientes en un solo lugar'
          />
          <FeatureCard
            icon={<ClipboardList className='h-10 w-10 text-primary' />}
            title='Historias Clínicas'
            description='Mantén registros detallados del progreso y tratamiento de cada paciente'
          />
          <FeatureCard
            icon={<LineChart className='h-10 w-10 text-primary' />}
            title='Seguimiento'
            description='Visualiza el progreso y evolución de tus pacientes con datos claros'
          />
          <FeatureCard
            icon={<Apple className='h-10 w-10 text-primary' />}
            title='Plan Nutricional'
            description='Crea y gestiona planes nutricionales personalizados para cada paciente'
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 bg-primary/5'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center space-y-4 text-center'>
            <h2 className='text-3xl font-bold'>
              Comienza a optimizar tu práctica nutricional
            </h2>
            <p className='text-gray-500 dark:text-gray-400 max-w-[600px]'>
              Únete a los profesionales que ya están mejorando su gestión
              nutricional con nuestra plataforma
            </p>
            <Button asChild size='lg'>
              <Link href={AuthRoutes.SIGN_IN}>Acceder al sistema</Link>
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
        <p className='text-sm text-gray-500 dark:text-gray-400'>{description}</p>
      </CardContent>
    </Card>
  )
}