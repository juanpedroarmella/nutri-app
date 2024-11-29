import { createBrowserClient } from '@supabase/ssr'
import { EnvVariables } from '../env.utils'

export const createClient = () =>
  createBrowserClient(EnvVariables.supaBaseUrl!, EnvVariables.supaBaseAnonKey!)
