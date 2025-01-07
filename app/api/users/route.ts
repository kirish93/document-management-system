import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { getUserFromCookie } from '@/lib/auth'
import { logAction } from '@/lib/logger'
import bcrypt from 'bcrypt'

export async function GET(request: Request) {
  const currentUser = await getUserFromCookie()
  if (!currentUser || currentUser.role !== 'Admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const users = await query('SELECT id, username, role FROM users')
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}



export async function POST(request: Request) {
  const currentUser = await getUserFromCookie()
  if (!currentUser || currentUser.role !== 'Admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { username, password, role } = await request.json()
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, role]
    )
    
    await logAction(currentUser.id, 'CREATE_USER', JSON.stringify({ username, role }))
    
    return NextResponse.json({ id: result.insertId }, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
