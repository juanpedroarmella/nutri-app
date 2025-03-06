
import { createClient } from '@/common/utils/supabase/server'

export async function GET() {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase.from('users').select()
    if (error) throw new Error(error.message)
    return Response.json(data)
  } catch (error) {
    const message = (error as Error).message ?? 'An error occurred.'
    return Response.json({ error: message }, { status: 400 })
  }
}
