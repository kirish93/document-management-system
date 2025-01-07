import { NextResponse } from 'next/server'
import { getUserFromCookie } from '@/lib/auth'

export async function GET() {
  try {
    const user = await getUserFromCookie() // Replace with your actual auth logic

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    return NextResponse.json({ id: user.id, username: user.username }) // Adjust fields as needed
  } catch (error) {
    console.error('Error fetching user data:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
