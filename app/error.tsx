'use client'

import { Button } from '@/common/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/common/components/ui/card'
import { AlertTriangle } from 'lucide-react'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-16 w-16 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Algo salió mal</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button onClick={reset} variant="outline">
            Intentar nuevamente
          </Button>
          <Button asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 