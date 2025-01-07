import { getUserFromCookie } from '@/lib/auth'
import { query } from '@/lib/db'
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'

async function getDocuments(userId: number, role: string) {
  let sql = 'SELECT * FROM documents'
  const values: any[] = []

  if (role === 'WA') {
    sql += ' WHERE created_by = ?'
    values.push(userId)
  }

  sql += ' ORDER BY created_at DESC'

  return query(sql, values)
}

export default async function DocumentsPage() {
  const user = await getUserFromCookie()

  if (!user) {
    return null // Handle this case in middleware
  }

  const documents = await getDocuments(user.id, user.role)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {user.role === 'WA' ? 'My Documents' : 'All Documents'}
      </h1>
      <Table>
        <TableCaption>A list of {user.role === 'WA' ? 'your' : 'all'} documents.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Document Name</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Frang Date</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc: any) => (
            <TableRow key={doc.id}>
              <TableCell>{doc.id}</TableCell>
              <TableCell>{doc.type}</TableCell>
              <TableCell>{doc.document_name}</TableCell>
              <TableCell>{doc.from_where}</TableCell>
              <TableCell>{doc.to_where}</TableCell>
              <TableCell>{new Date(doc.frang_date).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(doc.created_at).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

