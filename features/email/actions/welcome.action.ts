'use server'

import { sendWelcomeEmail } from '../services/email.service'

export async function sendWelcomeEmailAction(email: string, password: string) {
  return await sendWelcomeEmail(email, password)
}