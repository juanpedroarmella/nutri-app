import { APP_NAME } from '@/common/constants/app.constants'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card'
import { Separator } from '@/common/components/ui/separator'
import { Button } from '@/common/components/ui/button'
import { Shield, Users, FileText, AlertTriangle, Settings } from 'lucide-react'

export default function TermsOfService() {
  return (
    <div className="container max-w-4xl py-12">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Términos y Condiciones</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Última actualización: {new Date().toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">1. Aceptación de los Términos</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Al utilizar {APP_NAME}, aceptas cumplir con estos términos y condiciones que establecen 
              las reglas y pautas para el uso de nuestra plataforma. Estos términos están diseñados 
              para proteger tanto tus derechos como los nuestros y asegurar una experiencia segura 
              y profesional para todos los usuarios.
            </p>
          </section>

          <Separator />

          <section>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">2. Nuestros Servicios</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              {APP_NAME} es una plataforma integral de gestión nutricional que te ofrece:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-medium mb-2">Seguimiento Personalizado</h3>
                <p className="text-sm text-muted-foreground">
                  Monitoreo detallado de tu progreso nutricional con planes adaptados a tus necesidades
                </p>
              </Card>
              <Card className="p-4">
                <h3 className="font-medium mb-2">Gestión Documental</h3>
                <p className="text-sm text-muted-foreground">
                  Acceso seguro a tus planes alimenticios e historial médico
                </p>
              </Card>
            </div>
          </section>

          <Separator />

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">3. Tu Cuenta</h2>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">Como usuario de nuestra plataforma, te comprometes a:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-muted-foreground">Mantener la confidencialidad de tus credenciales de acceso</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-muted-foreground">Proporcionar información verídica y actualizada</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span className="text-muted-foreground">Notificar inmediatamente cualquier acceso no autorizado</span>
                </li>
              </ul>
            </div>
          </section>

          <Separator />

          <section>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">4. Uso Responsable</h2>
            </div>
            <Card className="p-4 border-destructive/50">
              <p className="text-muted-foreground mb-4">No está permitido:</p>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">• Compartir información falsa o engañosa</li>
                <li className="text-sm text-muted-foreground">• Violar la privacidad de otros usuarios</li>
                <li className="text-sm text-muted-foreground">• Usar la plataforma para fines no autorizados</li>
              </ul>
            </Card>
          </section>

          <Separator />

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">5. Modificaciones</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Nos reservamos el derecho de actualizar estos términos para mejorar nuestros servicios.
              Te notificaremos sobre cambios significativos a través de la plataforma o por correo electrónico.
            </p>
          </section>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <Button asChild variant="outline">
          <Link href="/">
            Volver al inicio
          </Link>
        </Button>
      </div>
    </div>
  )
}
