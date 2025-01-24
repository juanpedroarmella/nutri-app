import { Document } from '../types/document.types'
import DocumentComponent from './document.component'
import { User } from '@/features/users/types/user.types'

interface Props {
  documents: (Document & { user: User })[]
}

export default function DocumentList({ documents }: Props) {
  return (
    <div className='space-y-4 flex flex-col'>
      {documents.map(document => (
        <DocumentComponent key={document.id} document={document} />
      ))}

      {documents.length === 0 && (
        <p className='text-center text-muted-foreground py-20'>
          No hay documentos disponibles
        </p>
      )}
    </div>
  )
}
