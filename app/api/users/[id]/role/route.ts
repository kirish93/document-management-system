import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { getUserFromCookie } from '@/lib/auth'
import { logAction } from '@/lib/logger'

// Update a user's role
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const currentUser = await getUserFromCookie()
  if (!currentUser || currentUser.role !== 'Admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { role } = await request.json()

    // Validate input
    if (!role) {
      return NextResponse.json({ error: 'Role is required' }, { status: 400 })
    }

    // Validate role
    const validRoles = ['Admin', 'WA', 'MA']
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: `Invalid role. Allowed roles are: ${validRoles.join(', ')}` }, { status: 400 })
    }

    // Check if user exists
    const userCheck = await query<{ id: number }[]>(
      'SELECT id FROM users WHERE id = ?',
      [params.id]
    )
    if (userCheck.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update the role
    await query('UPDATE users SET role = ? WHERE id = ?', [role, params.id])
    await logAction(currentUser.id, 'UPDATE_ROLE', JSON.stringify({ id: params.id, role }))

    return NextResponse.json({ message: 'Role updated successfully' })
  } catch (error) {
    console.error('Error updating user role:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
