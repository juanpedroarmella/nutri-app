import { Document } from '../types/document.types'
import DocumentComponent from './document.component'

interface Props {
  documents: Document[]
}

export default function DocumentList({ documents }: Props) {
  return (
    <div className='space-y-4'>
      {documents.map(document => (
        <DocumentComponent key={document.id} document={document} />
      ))}

      {documents.length === 0 && (
        <p className='text-center text-muted-foreground'>
          No hay documentos disponibles
        </p>
      )}
    </div>
  )
}
