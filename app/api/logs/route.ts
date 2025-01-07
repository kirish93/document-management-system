import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const action = searchParams.get('action')
    const tableName = searchParams.get('tableName')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const documentName = searchParams.get('documentName')
    const username = searchParams.get('username')

    let sql = `
      SELECT l.*, u.username, d.document_name
      FROM logs l
      LEFT JOIN users u ON l.user_id = u.id
      LEFT JOIN documents d ON l.record_id = d.id AND l.table_name = 'documents'
      WHERE 1=1
    `
    const values: any[] = []

    if (userId) {
      sql += ' AND l.user_id = ?'
      values.push(userId)
    }
    if (action) {
      sql += ' AND l.action = ?'
      values.push(action)
    }
    if (tableName) {
      sql += ' AND l.table_name = ?'
      values.push(tableName)
    }
    if (startDate) {
      sql += ' AND l.created_at >= ?'
      values.push(startDate)
    }
    if (endDate) {
      sql += ' AND l.created_at <= ?'
      values.push(endDate)
    }
    if (documentName) {
      sql += ' AND d.document_name LIKE ?'
      values.push(`%${documentName}%`)
    }
    if (username) {
      sql += ' AND u.username LIKE ?'
      values.push(`%${username}%`)
    }

    sql += ' ORDER BY l.created_at DESC LIMIT 100'

    const results = await query(sql, values)
    return NextResponse.json(results)
  } catch (error) {
    console.error('Error fetching logs:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

