import { getUserFromCookie } from '@/lib/auth'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function Dashboard() {
  const user = await getUserFromCookie()

  if (!user) {
    return null // Handle this case in middleware
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.username}</h1>
      <div className="space-y-4">
        <Link href="/dashboard/documents/inward">
          <Button>Enter Inward Document</Button>
        </Link>
        <Link href="/dashboard/documents/outward">
          <Button>Enter Outward Document</Button>
        </Link> 
        <Link href="/dashboard/documents">
          <Button>
            {user.role === 'WA' ? 'View My Documents' : 'View All Documents'}
          </Button>
        </Link>
        {user.role === 'Admin' && (
          <>
            <Link href="/dashboard/users">
              <Button>Manage Users</Button>
            </Link>
            <Link href="/dashboard/logs">
              <Button>View System Logs</Button>
            </Link>
          </>
        )}
        <Link href="/dashboard/reset-password">
              <Button>Reset Password</Button>
            </Link>
      </div>
    </div>
  )
}

