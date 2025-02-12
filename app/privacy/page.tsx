import { APP_NAME } from '@/common/constants/app.constants'
import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className='container max-w-3xl py-12'>
      <h1 className='text-3xl font-bold mb-8'>Política de Privacidad</h1>

      <div className='prose prose-gray dark:prose-invert'>
        <p className='text-muted-foreground'>
          Última actualización: {new Date().toLocaleDateString()}
        </p>

        <section className='mt-8'>
          <h2 className='text-2xl font-semibold mb-4'>
            1. Información que Recopilamos
          </h2>
          <p>
            En {APP_NAME}, recopilamos la siguiente información para
            proporcionar nuestros servicios:
          </p>
          <ul className='list-disc pl-6 mt-2 space-y-2'>
            <li>Información personal básica (nombre, email)</li>
            <li>Datos de salud y nutrición</li>
            <li>Historial médico relevante</li>
            <li>Medidas antropométricas</li>
            <li>Hábitos alimenticios</li>
          </ul>
        </section>

        <section className='mt-8'>
          <h2 className='text-2xl font-semibold mb-4'>
            2. Uso de la Información
          </h2>
          <p>Utilizamos la información recopilada para:</p>
          <ul className='list-disc pl-6 mt-2 space-y-2'>
            <li>Proporcionar servicios de nutrición personalizados</li>
            <li>Realizar seguimiento de tu progreso</li>
            <li>Generar planes nutricionales</li>
            <li>Comunicarnos contigo sobre tu tratamiento</li>
            <li>Mejorar nuestros servicios</li>
          </ul>
        </section>

        <section className='mt-8'>
          <h2 className='text-2xl font-semibold mb-4'>
            3. Protección de Datos
          </h2>
          <p>
            Implementamos medidas de seguridad para proteger tu información:
          </p>
          <ul className='list-disc pl-6 mt-2 space-y-2'>
            <li>Encriptación de datos sensibles</li>
            <li>Acceso restringido a personal autorizado</li>
            <li>Copias de seguridad regulares</li>
            <li>Protocolos de seguridad actualizados</li>
          </ul>
        </section>

        <section className='mt-8'>
          <h2 className='text-2xl font-semibold mb-4'>4. Tus Derechos</h2>
          <p>Tienes derecho a:</p>
          <ul className='list-disc pl-6 mt-2 space-y-2'>
            <li>Acceder a tu información personal</li>
            <li>Corregir datos inexactos</li>
            <li>Solicitar la eliminación de tus datos</li>
            <li>Obtener una copia de tus datos</li>
          </ul>
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
