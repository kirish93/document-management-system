import { NextResponse } from 'next/server'
import { authenticateUser } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { username, password } = await request.json()
  const user = await authenticateUser(username, password)

  if (user) {
    cookies().set('user', JSON.stringify(user), { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
    return NextResponse.json({ role: user.role })
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}

