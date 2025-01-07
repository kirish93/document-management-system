import Link from 'next/link'

const navItems = {
  Admin: [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/users', label: 'User Management' },
    { href: '/dashboard/documents', label: 'All Documents' },
    { href: '/dashboard/logs', label: 'System Logs' },
  ],
  WA: [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/documents/inward', label: 'Enter Inward Document' },
    { href: '/dashboard/documents/outward', label: 'Enter Outward Document' },
    { href: '/dashboard/documents', label: 'My Documents' },
  ],
  MA: [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/documents/inward', label: 'Enter Inward Document' },
    { href: '/dashboard/documents/outward', label: 'Enter Outward Document' },
    { href: '/dashboard/documents', label: 'All Documents' },
  ],
}

export function DashboardNav({ role }: { role: 'Admin' | 'WA' | 'MA' }) {
  const items = navItems[role] || []

  return (
    <nav className="mt-5">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

