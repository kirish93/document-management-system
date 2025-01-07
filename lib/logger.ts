import { query } from './db'

export async function logAction(userId: number, action: string, details: string) {
  try {
    await query(
      'INSERT INTO logs (user_id, action, details) VALUES (?, ?, ?)',
      [userId, action, details]
    )
  } catch (error) {
    console.error('Error logging action:', error)
  }
}

