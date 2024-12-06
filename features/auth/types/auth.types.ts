export type CreateUserRequest = {
  email: string
  name: string
  surname: string
  role: string
  phone: number | null
}


export type AuthUser = {
  id: string
  email: string
}
