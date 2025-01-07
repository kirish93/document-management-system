'use client'

import { useState, useEffect } from 'react'

export default function PasswordResetPage() {
  const [userId, setUserId] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // Fetch the logged-in user's ID when the component loads
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('/api/auth/me') // Adjust the endpoint as needed
        if (response.ok) {
          const data = await response.json()
          setUserId(data.id) // Assuming the response has `id` for the user
        } else {
          console.error('Failed to fetch user ID')
        }
      } catch (err) {
        console.error('Error fetching user ID:', err)
      }
    }

    fetchUserId()
  }, [])

  const handlePasswordReset = async () => {
    if (!userId || !newPassword) {
      setError('Password is required')
      setMessage('')
      return
    }

    try {
      const response = await fetch(`/api/users/${userId}/password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'An error occurred while resetting the password.')
        setMessage('')
      } else {
        setMessage('Password reset successfully.')
        setError('')
        setNewPassword('') // Clear only the password field
      }
    } catch (err) {
      console.error('Error:', err)
      setError('An unexpected error occurred.')
      setMessage('')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Reset Your Password</h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {message && <div className="mb-4 text-green-600">{message}</div>}
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block mb-2 font-medium">User ID</label>
          <input
            type="text"
            value={userId}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          onClick={handlePasswordReset}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Reset Password
        </button>
      </div>
    </div>
  )
}
