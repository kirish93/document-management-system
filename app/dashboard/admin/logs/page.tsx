'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'

interface Log {
  id: number
  user_id: number
  username: string
  action: 'create' | 'update' | 'delete'
  table_name: string
  record_id: number
  document_name: string
  changes: string
  created_at: string
}

export default function LogViewer() {
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    documentName: '',
    username: '',
    action: '',
  })

  useEffect(() => {
    fetchLogs()
  }, [searchParams])

  const fetchLogs = async () => {
    setLoading(true)
    setError(null)
    try {
      const queryParams = new URLSearchParams(filters)
      const response = await fetch(`/api/logs?${queryParams}`)
      if (!response.ok) {
        throw new Error('Failed to fetch logs')
      }
      const data = await response.json()
      setLogs(data)
    } catch (err) {
      setError('An error occurred while fetching logs')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchLogs()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Log Viewer</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
            <Input
              type="date"
              id="startDate"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
            <Input
              type="date"
              id="endDate"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label htmlFor="documentName" className="block text-sm font-medium text-gray-700">Document Name</label>
            <Input
              type="text"
              id="documentName"
              name="documentName"
              value={filters.documentName}
              onChange={handleFilterChange}
              placeholder="Search by document name"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <Input
              type="text"
              id="username"
              name="username"
              value={filters.username}
              onChange={handleFilterChange}
              placeholder="Search by username"
            />
          </div>
          <div>
            <label htmlFor="action" className="block text-sm font-medium text-gray-700">Action</label>
            <select
              id="action"
              name="action"
              value={filters.action}
              onChange={handleFilterChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">All Actions</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
            </select>
          </div>
        </div>
        <Button type="submit">Search Logs</Button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && (
        <Table>
          <TableCaption>A list of recent system logs.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Table</TableHead>
              <TableHead>Record ID</TableHead>
              <TableHead>Document Name</TableHead>
              <TableHead>Changes</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.id}</TableCell>
                <TableCell>{log.username}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.table_name}</TableCell>
                <TableCell>{log.record_id}</TableCell>
                <TableCell>{log.document_name || 'N/A'}</TableCell>
                <TableCell>
                  <pre className="whitespace-pre-wrap max-w-xs overflow-auto">
                    {JSON.stringify(JSON.parse(log.changes), null, 2)}
                  </pre>
                </TableCell>
                <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

