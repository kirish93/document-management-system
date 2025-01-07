import { getUserFromCookie } from '@/lib/auth'
import UserManagementClient from './user-management-client'

export default async function UserManagementPage() {
  const user = await getUserFromCookie()

  if (!user || user.role !== 'Admin') {
    return <div className="text-red-500">Access Denied. Admin privileges required.</div>
  }

  return <UserManagementClient />
}

