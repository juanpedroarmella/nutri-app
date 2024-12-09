import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card'
import { FileText } from 'lucide-react'

export default function DocumentsPage() {
  return (
    <div className='flex-1 w-full flex flex-col gap-6 p-6 max-w-7xl mx-auto'>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle>Documentos</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Gestiona los documentos del sistema
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <p>Funcionalidad en desarrollo</p>
        </CardContent>
      </Card>
    </div>
  )
} 