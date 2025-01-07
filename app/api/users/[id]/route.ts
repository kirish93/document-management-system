import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { getUserFromCookie } from '@/lib/auth'
import { logAction } from '@/lib/logger'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('DELETE request received:', params)

  const currentUser = await getUserFromCookie()
  if (!currentUser || currentUser.role !== 'Admin') {
    console.log('Unauthorized access attempt.')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const userId = params.id
    console.log('User ID to delete:', userId)

    if (!userId) {
      console.log('User ID missing from request.')
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const deleteResult = await query('DELETE FROM users WHERE id = ?', [userId])
    console.log('Delete query result:', deleteResult)

    await logAction(currentUser.id, 'DELETE_USER', JSON.stringify({ userId }))

    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error in DELETE route:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// Update a user's role
export async function PUT(request: Request) {
    const currentUser = await getUserFromCookie()
    if (!currentUser || currentUser.role !== 'Admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  
    try {
      const { id, role } = await request.json()
  
      // Validate input
      if (!id || !role) {
        return NextResponse.json({ error: 'User ID and role are required' }, { status: 400 })
      }
  
      // Validate role
      const validRoles = ['Admin', 'WA', 'MA']
      if (!validRoles.includes(role)) {
        return NextResponse.json({ error: `Invalid role. Allowed roles are: ${validRoles.join(', ')}` }, { status: 400 })
      }
  
      // Check if the user exists
      const userCheck = await query('SELECT * FROM users WHERE id = ?', [id])
      if (Array.isArray(userCheck) && userCheck.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
  
      // Update role
      await query('UPDATE users SET role = ? WHERE id = ?', [role, id])
      await logAction(currentUser.id, 'UPDATE_ROLE', JSON.stringify({ id, role }))
  
      // Return success response
      return NextResponse.json({ message: 'Role updated successfully', updatedUser: { id, role } })
    } catch (error) {
      console.error('Error updating user role:', error)
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  }