import { APP_NAME } from '@/common/constants/app.constants'

interface WelcomeEmailProps {
  userEmail: string
  password: string
  redirectUrl: string
}

export default function WelcomeEmail({
  userEmail,
  password,
  redirectUrl
}: WelcomeEmailProps) {
  return (
    <div
      style={{
        backgroundColor: '#f3f4f6',
        fontFamily: 'Arial, sans-serif',
        padding: '48px 24px'
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          maxWidth: '600px',
          margin: '0 auto',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#111827',
            marginBottom: '24px'
          }}
        >
          ¡Bienvenido a {APP_NAME}!
        </h1>

        <p
          style={{
            fontSize: '16px',
            color: '#4b5563',
            textAlign: 'center',
            marginBottom: '32px'
          }}
        >
          Tu cuenta ha sido creada exitosamente. A continuación encontrarás tus
          credenciales de acceso:
        </p>

        <div
          style={{
            backgroundColor: '#f9fafb',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '32px',
            border: '1px solid #f3f4f6'
          }}
        >
          <p
            style={{ fontSize: '16px', color: '#111827', marginBottom: '16px' }}
          >
            <strong>Email:</strong> {userEmail}
          </p>
          <p style={{ fontSize: '16px', color: '#111827', margin: '0' }}>
            <strong>Contraseña:</strong> {password}
          </p>
        </div>

        <p
          style={{
            fontSize: '14px',
            color: '#6b7280',
            textAlign: 'center',
            marginBottom: '24px'
          }}
        >
          Recuerda que puedes cambiar tu contraseña en cualquier momento dentro
          de la aplicación.
        </p>

        <a
          href={redirectUrl}
          style={{
            display: 'block',
            backgroundColor: '#000000',
            color: '#ffffff',
            padding: '16px 24px',
            textDecoration: 'none',
            borderRadius: '12px',
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: '500',
            marginBottom: '32px'
          }}
        >
          Iniciar Sesión
        </a>

        <hr
          style={{
            border: 'none',
            borderTop: '1px solid #e5e7eb',
            margin: '32px 0'
          }}
        />

        <p
          style={{
            fontSize: '14px',
            color: '#6b7280',
            textAlign: 'center',
            marginBottom: '24px'
          }}
        >
          También puedes iniciar sesión utilizando tu cuenta de Google haciendo
          clic en el botón correspondiente en la página de inicio de sesión.
        </p>

        <p
          style={{
            fontSize: '12px',
            color: '#9ca3af',
            textAlign: 'center'
          }}
        >
          Si no solicitaste esta cuenta, puedes ignorar este correo.
        </p>
      </div>

      <p
        style={{
          fontSize: '12px',
          color: '#9ca3af',
          textAlign: 'center',
          marginTop: '24px'
        }}
      >
        © {new Date().getFullYear()} {APP_NAME}. Todos los derechos reservados.
      </p>
    </div>
  )
}
