// This check can be removed
// it is just for tutorial purposes

import { EnvVariables } from '../env.utils'

export const hasEnvVars =
  EnvVariables.supaBaseUrl && EnvVariables.supaBaseAnonKey
