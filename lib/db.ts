// import mysql from 'mysql2/promise'

// const pool = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   port: parseInt(process.env.MYSQL_PORT || '3306'),
//   database: process.env.MYSQL_DATABASE,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   connectionLimit: 10,
// })

// export async function query(sql: string, values: any[] = []) {
//   const [results] = await pool.query(sql, values)
//   return results
// }

import mysql, { RowDataPacket, ResultSetHeader, FieldPacket } from 'mysql2/promise'

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  connectionLimit: 10,
})

// Type-safe query function
export async function query<T extends RowDataPacket[] | ResultSetHeader>(
  sql: string,
  values?: any[]
): Promise<T> {
  const [results] = await pool.query<T>(sql, values)
  return results
}
