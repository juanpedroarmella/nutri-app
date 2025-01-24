'use server'

import { createClientAdmin } from '@/common/utils/supabase/server'

const BUCKET_NAME = 'documents'

export async function getDownloadURL(path: string) {
  const supabase = await createClientAdmin()
  
  const { data } = await supabase
    .storage
    .from(BUCKET_NAME)
    .createSignedUrl(path, 60) // URL válida por 60 segundos

  if (!data?.signedUrl) {
    throw new Error('No se pudo generar la URL de descarga')
  }

  return data.signedUrl
} 