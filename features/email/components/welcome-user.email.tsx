import { APP_NAME } from '@/common/constants/app.constants'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text
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
      <Preview>Bienvenido a {APP_NAME}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Bienvenido a {APP_NAME}</Heading>
          <Text style={text}>Aquí están tus credenciales de acceso:</Text>
          <Text style={credentialsContainer}>
            <strong>Email:</strong> {userEmail}
            <br />
            <strong>Contraseña:</strong> {password}
          </Text>
          <Text style={text}>
            También puedes iniciar sesión utilizando tu cuenta de Google
            haciendo clic en el botón correspondiente en la página de inicio de
            sesión.
          </Text>
          <Link href={redirectUrl} style={button}>
            Ir a iniciar sesión
          </Link>
          <Text style={footer}>
            Si no solicitaste esta cuenta, puedes ignorar este correo.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px'
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '40px',
  margin: '0 0 20px'
}

const text = {
  color: '#444',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px'
}

const credentialsContainer = {
  backgroundColor: '#f4f4f4',
  padding: '16px',
  borderRadius: '4px',
  margin: '24px 0',
  color: '#444',
  fontSize: '16px',
  lineHeight: '24px'
}

const button = {
  backgroundColor: '#000',
  borderRadius: '4px',
  color: '#fff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '50px',
  textAlign: 'center' as const,
  textDecoration: 'none',
  width: '100%',
  marginTop: '24px'
}

const footer = {
  color: '#898989',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '24px 0 0'
}
