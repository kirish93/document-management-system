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

async function getLogs() {
  return query('SELECT logs.*, users.username FROM logs JOIN users ON logs.user_id = users.id ORDER BY logs.created_at DESC LIMIT 100')
}

export default async function SystemLogsPage() {
  const user = await getUserFromCookie()

  if (!user || user.role !== 'Admin') {
    return <div className="text-red-500">Access Denied. Admin privileges required.</div>
  }

  const logs = await getLogs()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">System Logs</h1>
      <Table>
        <TableCaption>Recent system logs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log: any) => (
            <TableRow key={log.id}>
              <TableCell>{log.id}</TableCell>
              <TableCell>{log.username}</TableCell>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.details}</TableCell>
              <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

