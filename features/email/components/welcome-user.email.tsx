import { APP_NAME } from '@/common/constants/app.constants'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind
} from '@react-email/components'

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
    <Html>
      <Head />
      <Preview>Bienvenido a {APP_NAME} - Tus credenciales de acceso</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto py-12 px-6 max-w-[600px]">
            <Section className="bg-white rounded-xl shadow-lg border border-gray-200 p-12">
              <Heading className="text-3xl font-bold text-gray-900 mb-6 text-center">
                ¡Bienvenido a {APP_NAME}!
              </Heading>
              
              <Text className="text-gray-700 text-lg mb-8 text-center">
                Tu cuenta ha sido creada exitosamente. A continuación encontrarás tus credenciales de acceso:
              </Text>

              <Section className="bg-gray-50 rounded-xl p-8 mb-8 border border-gray-100">
                <Text className="text-gray-800 text-lg mb-4">
                  <strong>Email:</strong> {userEmail}
                </Text>
                <Text className="text-gray-800 text-lg">
                  <strong>Contraseña:</strong> {password}
                </Text>
              </Section>

              <Button 
                href={redirectUrl}
                className="bg-black text-white px-8 py-4 rounded-xl font-medium w-full text-center text-lg hover:bg-gray-800 transition-colors"
              >
                Iniciar Sesión
              </Button>

              <Hr className="border-gray-200 my-8" />

              <Text className="text-gray-600 text-base text-center">
                También puedes iniciar sesión utilizando tu cuenta de Google haciendo clic en el botón correspondiente en la página de inicio de sesión.
              </Text>

              <Text className="text-gray-500 text-sm text-center mt-8">
                Si no solicitaste esta cuenta, puedes ignorar este correo.
              </Text>
            </Section>

            <Text className="text-gray-400 text-sm text-center mt-6">
              © {new Date().getFullYear()} {APP_NAME}. Todos los derechos reservados.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}