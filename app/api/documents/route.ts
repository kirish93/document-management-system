import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { getUserFromCookie } from '@/lib/auth'
import { logAction } from '@/lib/logger'

export async function GET(request: Request) {
  const user = await getUserFromCookie()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const date = searchParams.get('date')
    const name = searchParams.get('name')

    let sql = 'SELECT * FROM documents WHERE 1=1'
    const values: any[] = []

    if (user.role === 'WA') {
      sql += ' AND created_by = ?'
      values.push(user.id)
    }

    if (type) {
      sql += ' AND type = ?'
      values.push(type)
    }
    if (date) {
      sql += ' AND DATE(created_at) = ?'
      values.push(date)
    }
    if (name) {
      sql += ' AND document_name LIKE ?'
      values.push(`%${name}%`)
    }

    const results = await query(sql, values)
    return NextResponse.json(results)
  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const user = await getUserFromCookie()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { type, documentName, fromWhere, toWhere, frangDate } = await request.json()
    const result = await query(
      'INSERT INTO documents (type, document_name, from_where, to_where, frang_date, created_by) VALUES (?, ?, ?, ?, ?, ?)',
      [type, documentName, fromWhere, toWhere, frangDate, user.id]
    )
    
    await logAction(
      user.id, 
      'CREATE_DOCUMENT', 
      JSON.stringify({ type, documentName, fromWhere, toWhere, frangDate })
    )
    
    return NextResponse.json({ id: result.insertId }, { status: 201 })
  } catch (error) {
    console.error('Error creating document:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

