import { DashboardNav } from '@/components/dashboard-nav'
import { SignOutButton } from '@/components/sign-out-button'
import { getUserFromCookie } from '@/lib/auth'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUserFromCookie()

  if (!user) {
    return null // Handle this case in middleware
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <DashboardNav role={user.role} />
        <div className="p-4">
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

