import { APP_NAME } from '@/common/constants/app.constants'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card'
import { Separator } from '@/common/components/ui/separator'
import { Button } from '@/common/components/ui/button'
import { Shield, FileText, Lock, UserCheck } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="container max-w-4xl py-12">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Política de Privacidad</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Última actualización: {new Date().toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">1. Información que Recopilamos</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              En {APP_NAME}, recopilamos la siguiente información para proporcionar nuestros servicios:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-medium mb-2">Datos Personales</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Información personal básica</li>
                  <li>• Datos de salud y nutrición</li>
                  <li>• Historial médico relevante</li>
                </ul>
              </Card>
              <Card className="p-4">
                <h3 className="font-medium mb-2">Datos de Seguimiento</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Medidas antropométricas</li>
                  <li>• Hábitos alimenticios</li>
                  <li>• Progreso nutricional</li>
                </ul>
              </Card>
            </div>
          </section>

          <Separator />

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">2. Uso de la Información</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Utilizamos la información recopilada para los siguientes propósitos:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span className="text-muted-foreground">Proporcionar servicios de nutrición personalizados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span className="text-muted-foreground">Realizar seguimiento de tu progreso nutricional</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span className="text-muted-foreground">Generar planes alimenticios adaptados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span className="text-muted-foreground">Comunicarnos contigo sobre tu tratamiento</span>
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">3. Protección de Datos</h2>
            </div>
            <Card className="p-4 border-primary/10">
              <p className="text-muted-foreground mb-4">
                Implementamos estrictas medidas de seguridad para proteger tu información:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Encriptación de datos sensibles</li>
                <li>• Acceso restringido a personal autorizado</li>
                <li>• Copias de seguridad regulares</li>
                <li>• Protocolos de seguridad actualizados</li>
              </ul>
            </Card>
          </section>

          <Separator />

          <section>
            <div className="flex items-center gap-2 mb-4">
              <UserCheck className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">4. Tus Derechos</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Como usuario de nuestra plataforma, tienes los siguientes derechos:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="p-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Acceder a tu información personal</li>
                  <li>• Corregir datos inexactos</li>
                </ul>
              </Card>
              <Card className="p-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Solicitar la eliminación de tus datos</li>
                  <li>• Obtener una copia de tus datos</li>
                </ul>
              </Card>
            </div>
          </section>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <Button asChild variant="outline">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  )
}
