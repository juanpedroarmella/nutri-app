'use server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createClient as createClientSupabase } from '@supabase/supabase-js'
import { Database } from '@/common/types/database.types'
import { EnvVariables } from '../env.utils'

export const createClient = async () => {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    EnvVariables.supaBaseUrl!,
    EnvVariables.supaBaseAnonKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        }
      }
    }
  )
}

export const createClientAdmin = async () => {
  return createClientSupabase<Database>(
    EnvVariables.supaBaseUrl!,
    EnvVariables.supaBaseServiceRoleKey!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
