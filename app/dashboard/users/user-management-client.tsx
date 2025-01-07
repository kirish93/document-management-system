'use client'

import { useState, useEffect } from 'react'
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface User {
  id: number
  username: string
  role: string
}

export default function UserManagementClient() {
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
//handle delete
const handleDelete = async (userId: number) => {
  const confirmed = window.confirm('Are you sure you want to delete this user?')
  if (!confirmed) return

  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      setUsers(users.filter((user) => user.id !== userId))
      alert('User deleted successfully') // Optional: Show success message
    } else {
      const data = await response.json()
      alert(`Error deleting user: ${data.error || 'Unknown error'}`) // Show error message
    }
  } catch (error) {
    console.error('Error deleting user:', error)
    alert('An unexpected error occurred while deleting the user.') // Handle unexpected errors
  }
}
//handle chenge role
const handleChangeRole = async (userId: number) => {
  const newRole = prompt('Enter the new role (WA, MA, Admin):')
  if (!newRole || !['WA', 'MA', 'Admin'].includes(newRole)) {
    alert('Invalid role')
    return
  }

  try {
    const response = await fetch(`/api/users/${userId}/role`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: newRole }),
    })

    if (response.ok) {
      alert('Role updated successfully')
      fetchUsers() // Refresh user list if necessary
    } else {
      const data = await response.json()
      alert(`Error: ${data.error || 'Unknown error'}`)
    }
  } catch (error) {
    console.error('Error updating role:', error)
    alert('An unexpected error occurred.')
  }
}

//password change
const resetPassword = async (userId: number, newPassword: string) => {
  try {
    const response = await fetch(`/api/users/${userId}/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: newPassword }),
    })
  
    if (!response.ok) {
      const data = await response.json()
      alert(`Error: ${data.error || 'Unknown error'}`)
      return
    }
  
    alert('Password reset successfully')
  } catch (error) {
    console.error('Error resetting password:', error)
    alert('An unexpected error occurred.')
  }
  
}

const handleResetPassword = async (userId: number) => {
  const newPassword = prompt('Enter the new password:')
  if (!newPassword) {
    alert('Password reset canceled.')
    return
  }

  await resetPassword(userId, newPassword)
}



  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
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
        >
          <option value="WA">WA</option>
          <option value="MA">MA</option>
          <option value="Admin">Admin</option>
        </select>
        <Button type="submit">Add User</Button>
      </form>
      
      <Table>
        <TableCaption>A list of all users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
              <Button onClick={() => handleChangeRole(user.id)}>Change Role</Button>
              <Button onClick={() => handleDelete(user.id)}>Delete</Button>
              <Button onClick={() => handleResetPassword(user.id)}>Reset Password</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// 'use client'

// import { useState, useEffect } from 'react'
// import { 
//   Table, 
//   TableBody, 
//   TableCaption, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from '@/components/ui/table'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'

// interface User {
//   id: number
//   username: string
//   role: string
// }

// export default function UserManagementClient() {
//   const [users, setUsers] = useState<User[]>([])
//   const [newUser, setNewUser] = useState({ username: '', password: '', role: 'WA' })

//   useEffect(() => {
//     fetchUsers()
//   }, [])

//   const fetchUsers = async () => {
//     const response = await fetch('/api/users')
//     if (response.ok) {
//       const data = await response.json()
//       setUsers(data)
//     }
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setNewUser({ ...newUser, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const response = await fetch('/api/users', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newUser),
//     })
//     if (response.ok) {
//       setNewUser({ username: '', password: '', role: 'WA' })
//       fetchUsers()
//     }
//   }

//   const handleDelete = async (userId: number) => {
//     const confirmed = window.confirm('Are you sure you want to delete this user?')
//     if (!confirmed) return

//     try {
//       const response = await fetch(`/api/users/${userId}`, {
//         method: 'DELETE',
//       })

//       if (response.ok) {
//         setUsers(users.filter((user) => user.id !== userId))
//       } else {
//         console.error('Failed to delete user')
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error)
//     }
//   }

//   const handleEdit = (user: User) => {
//     alert(`Edit user: ${user.username}`)
//     // Add edit logic here
//   }

//   const handleResetPassword = (user: User) => {
//     alert(`Reset password for: ${user.username}`)
//     // Add reset password logic here
//   }

//   const handleChangeRole = async (userId: number) => {
//     const newRole = prompt('Enter the new role (WA, MA, Admin):')
//     if (!newRole || !['WA', 'MA', 'Admin'].includes(newRole)) {
//       alert('Invalid role')
//       return
//     }

//     try {
//       const response = await fetch(`/api/users/${userId}/role`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ role: newRole }),
//       })

//       if (response.ok) {
//         fetchUsers()
//       } else {
//         console.error('Failed to change role')
//       }
//     } catch (error) {
//       console.error('Error changing role:', error)
//     }
//   }

//   const handleViewLogs = (userId: number) => {
//     alert(`View logs for user ID: ${userId}`)
//     // Add logic to view logs
//   }

//   const handleViewDocuments = (userId: number) => {
//     alert(`View documents for user ID: ${userId}`)
//     // Add logic to view documents
//   }

//   const handleViewProfile = (userId: number) => {
//     alert(`View profile for user ID: ${userId}`)
//     // Add logic to view profile
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">User Management</h1>
      
//       <form onSubmit={handleSubmit} className="mb-8 space-y-4">
//         <Input
//           type="text"
//           name="username"
//           value={newUser.username}
//           onChange={handleInputChange}
//           placeholder="Username"
//           required
//         />
//         <Input
//           type="password"
//           name="password"
//           value={newUser.password}
//           onChange={handleInputChange}
//           placeholder="Password"
//           required
//         />
//         <select
//           name="role"
//           value={newUser.role}
//           onChange={handleInputChange}
//           className="w-full p-2 border border-gray-300 rounded"
//         >
//           <option value="WA">WA</option>
//           <option value="MA">MA</option>
//           <option value="Admin">Admin</option>
//         </select>
//         <Button type="submit">Add User</Button>
//       </form>
      
//       <Table>
//         <TableCaption>A list of all users.</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>ID</TableHead>
//             <TableHead>Username</TableHead>
//             <TableHead>Role</TableHead>
//             <TableHead>Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {users.map((user) => (
//             <TableRow key={user.id}>
//               <TableCell>{user.id}</TableCell>
//               <TableCell>{user.username}</TableCell>
//               <TableCell>{user.role}</TableCell>
//               <TableCell>
//                 <Button onClick={() => handleEdit(user)}>Edit</Button>
//                 <Button onClick={() => handleResetPassword(user)}>Reset Password</Button>
//                 <Button onClick={() => handleChangeRole(user.id)}>Change Role</Button>
//                 <Button onClick={() => handleViewLogs(user.id)}>View Logs</Button>
//                 <Button onClick={() => handleViewDocuments(user.id)}>View Documents</Button>
//                 <Button onClick={() => handleViewProfile(user.id)}>View Profile</Button>
//                 <Button onClick={() => handleDelete(user.id)}>Delete</Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }
