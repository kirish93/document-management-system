'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'

interface User {
  id: number
  username: string
  role: 'WA' | 'MA' | 'Admin'
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'WA' })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const response = await fetch('/api/users')
    if (response.ok) {
      const data = await response.json()
      setUsers(data)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
    if (response.ok) {
      setNewUser({ username: '', password: '', role: 'WA' })
      fetchUsers()
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleInputChange}
          placeholder="Username"
          required
        />
        <Input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
        <select
          name="role"
          value={newUser.role}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="WA">WA</option>
          <option value="MA">MA</option>
          <option value="Admin">Admin</option>
        </select>
        <Button type="submit">Add User</Button>
      </form>

      <Table>
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

