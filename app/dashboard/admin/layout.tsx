import { DashboardNav } from '@/components/dashboard-nav'
import { SignOutButton } from '@/components/sign-out-button'

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <DashboardNav role="admin" />
        <SignOutButton />
      </aside>
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

