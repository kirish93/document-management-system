import { compare } from 'bcrypt'
import { query } from './db'
import { cookies } from 'next/headers'

export async function authenticateUser(username: string, password: string) {
  const [user] = await query('SELECT * FROM users WHERE username = ?', [username])
  if (!user) return null

  const isValid = await compare(password, user.password)
  if (!isValid) return null

  return { id: user.id, username: user.username, role: user.role }
}

export async function getUserFromCookie() {
  const userCookie = cookies().get('user')
  if (!userCookie) return null

  return JSON.parse(userCookie.value)
}

