import { Document } from '../types/document.types'

interface Props {
  document: Document
}

export default function DocumentComponent({ document }: Props) {
  return <div>Document {document.name}</div>
}
