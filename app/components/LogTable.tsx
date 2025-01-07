import { useState, useEffect } from 'react'

interface Log {
  id: number
  user_id: number
  action: 'create' | 'update' | 'delete'
  table_name: string
  record_id: number
  changes: string
  created_at: string
}

export default function LogTable() {
  const [logs, setLogs] = useState<Log[]>([])

  useEffect(() => {
    const fetchLogs = async () => {
      const response = await fetch('/api/logs')
      if (response.ok) {
        const data = await response.json()
        setLogs(data)
      }
    }
    fetchLogs()
  }, [])

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">User ID</th>
            <th className="py-3 px-6 text-left">Action</th>
            <th className="py-3 px-6 text-left">Table</th>
            <th className="py-3 px-6 text-left">Record ID</th>
            <th className="py-3 px-6 text-left">Changes</th>
            <th className="py-3 px-6 text-left">Timestamp</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {logs.map((log) => (
            <tr key={log.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{log.id}</td>
              <td className="py-3 px-6 text-left">{log.user_id}</td>
              <td className="py-3 px-6 text-left">{log.action}</td>
              <td className="py-3 px-6 text-left">{log.table_name}</td>
              <td className="py-3 px-6 text-left">{log.record_id}</td>
              <td className="py-3 px-6 text-left">
                <pre className="whitespace-pre-wrap">{JSON.stringify(JSON.parse(log.changes), null, 2)}</pre>
              </td>
              <td className="py-3 px-6 text-left">{new Date(log.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

