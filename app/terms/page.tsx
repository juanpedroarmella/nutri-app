import { APP_NAME } from '@/common/constants/app.constants'
import Link from 'next/link'

export default function TermsOfService() {
  return (
    <div className='container max-w-3xl py-12'>
      <h1 className='text-3xl font-bold mb-8'>Términos y Condiciones</h1>

      <div className='prose prose-gray dark:prose-invert'>
        <p className='text-muted-foreground'>
          Última actualización: {new Date().toLocaleDateString()}
        </p>

        <section className='mt-8'>
          <h2 className='text-2xl font-semibold mb-4'>
            1. Aceptación de los Términos
          </h2>
          <p>
            Al acceder y utilizar {APP_NAME}, aceptas estos términos y
            condiciones en su totalidad. Si no estás de acuerdo con alguna parte
            de estos términos, no debes utilizar nuestros servicios.
          </p>
        </section>

        <section className='mt-8'>
          <h2 className='text-2xl font-semibold mb-4'>
            2. Descripción del Servicio
          </h2>
          <p>{APP_NAME} es una plataforma de gestión nutricional que ofrece:</p>
          <ul className='list-disc pl-6 mt-2 space-y-2'>
            <li>Seguimiento nutricional personalizado</li>
            <li>Acceso a planes alimenticios</li>
            <li>Gestión de documentos médicos</li>
            <li>Comunicación con profesionales de la nutrición</li>
          </ul>
        </section>

        <section className='mt-8'>
          <h2 className='text-2xl font-semibold mb-4'>3. Cuentas de Usuario</h2>
          <p>Al crear una cuenta en nuestra plataforma:</p>
          <ul className='list-disc pl-6 mt-2 space-y-2'>
            <li>Debes proporcionar información precisa y completa</li>
            <li>
              Eres responsable de mantener la confidencialidad de tu cuenta
            </li>
            <li>Debes notificar cualquier uso no autorizado de tu cuenta</li>
            <li>La cuenta debe ser gestionada por un profesional autorizado</li>
          </ul>
        </section>

        <section className='mt-8'>
          <h2 className='text-2xl font-semibold mb-4'>4. Uso Apropiado</h2>
          <p>Te comprometes a no:</p>
          <ul className='list-disc pl-6 mt-2 space-y-2'>
            <li>Compartir información falsa o engañosa</li>
            <li>Violar derechos de propiedad intelectual</li>
            <li>Interferir con la seguridad del servicio</li>
            <li>Compartir información confidencial de otros usuarios</li>
          </ul>
        </section>

        <section className='mt-8'>
          <h2 className='text-2xl font-semibold mb-4'>
            5. Modificaciones del Servicio
          </h2>
          <p>
            Nos reservamos el derecho de modificar o discontinuar el servicio en
            cualquier momento, con o sin previo aviso. No seremos responsables
            ante ti ni ante terceros por cualquier modificación, suspensión o
            interrupción del servicio.
          </p>
        </section>
      </div>

      <div className='mt-12 text-center'>
        <Link href='/' className='text-primary hover:underline'>
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
