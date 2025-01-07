// import { NextResponse } from 'next/server'
// import { query } from '@/lib/db'
// import { getUserFromCookie } from '@/lib/auth'
// import { logAction } from '@/lib/logger'
// import bcrypt from 'bcrypt'

// // Reset a user's password
// export async function PATCH(request: Request) {
//   const currentUser = await getUserFromCookie()
//   if (!currentUser || currentUser.role !== 'Admin') {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

//   try {
//     const { id, password } = await request.json()

//     // // Validate input
//     // if (!id || !password) {
//     //   return NextResponse.json({ error: 'User ID and new password are required' }, { status: 400 })
//     // }

//     // Password strength validation (optional)
//     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
//     if (!passwordRegex.test(password)) {
//       return NextResponse.json({
//         error: 'Password must be at least 8 characters long and contain at least one letter and one number',
//       }, { status: 400 })
//     }

//     // Check if the user exists
//     const userCheck = (await query(
//         'SELECT id FROM users WHERE id = ?',
//         [id]
//       )) as { id: number }[]
      
//     if (userCheck.length === 0) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 })
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(password, 10)

//     // Update the user's password
//     await query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id])
//     await logAction(currentUser.id, 'RESET_PASSWORD', JSON.stringify({ id }))

//     return NextResponse.json({ message: 'Password reset successfully' })
//   } catch (error) {
//     console.error('Error resetting user password:', error)
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
//   }
// }

// // import { NextResponse } from 'next/server'
// // import bcrypt from 'bcrypt'
// // import { query } from '@/lib/db'
// // import { RowDataPacket } from 'mysql2'

// // export async function PATCH(request: Request, { params }: { params: { id: string } }) {
// //   try {
// //     const { password } = await request.json()

// //     if (!password) {
// //       return NextResponse.json({ error: 'Password is required' }, { status: 400 })
// //     }

// //     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
// //     if (!passwordRegex.test(password)) {
// //       return NextResponse.json({
// //         error: 'Password must be at least 8 characters long and contain at least one letter and one number',
// //       }, { status: 400 })
// //     }

// //     // Narrow type to RowDataPacket[]
// //     const userCheck = (await query(
// //         'SELECT id FROM users WHERE id = ?',
// //         [params.id]
// //       )) as RowDataPacket[]

// //     // Check if the user exists
// //     if (userCheck.length === 0) {
// //       return NextResponse.json({ error: 'User not found' }, { status: 404 })
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10)
// //     await query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, params.id])

// //     return NextResponse.json({ message: 'Password reset successfully' })
// //   } catch (error) {
// //     console.error('Error resetting user password:', error)
// //     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
// //   }
// // }

// import { NextResponse } from 'next/server'
// import bcrypt from 'bcrypt'
// import { query } from '@/lib/db'
// import { RowDataPacket } from 'mysql2'

// export async function PATCH(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const { password } = await request.json()

//     if (!password) {
//       return NextResponse.json({ error: 'Password is required' }, { status: 400 })
//     }

//     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
//     if (!passwordRegex.test(password)) {
//       return NextResponse.json({
//         error: 'Password must be at least 8 characters long and contain at least one letter and one number',
//       }, { status: 400 })
//     }

//     const userCheck = await query<RowDataPacket[]>(
//       'SELECT id FROM users WHERE id = ?',
//       [params.id]
//     )

//     if (userCheck.length === 0) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 })
//     }

//     const hashedPassword = await bcrypt.hash(password, 10)
//     await query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, params.id])

//     return NextResponse.json({ message: 'Password reset successfully' })
//   } catch (error) {
//     console.error('Error resetting password:', error)
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
//   }
// }
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { query } from '@/lib/db'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { password } = await request.json()

    // Validate password
    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 })
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json({
        error: 'Password must be at least 8 characters long and contain at least one letter and one number',
      }, { status: 400 })
    }

    // Check if user exists
    const userCheck = await query<{ id: number }[]>(
      'SELECT id FROM users WHERE id = ?',
      [params.id]
    )
    if (userCheck.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Hash and update the password
    const hashedPassword = await bcrypt.hash(password, 10)
    await query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, params.id])

    return NextResponse.json({ message: 'Password reset successfully' })
  } catch (error) {
    console.error('Error resetting password:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
