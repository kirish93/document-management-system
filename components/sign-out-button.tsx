'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    const response = await fetch('/api/auth/logout', { method: 'POST' })
    if (response.ok) {
      router.push('/login')
    }
  }

  return (
    <Button onClick={handleSignOut} className="w-full">
      Sign Out
    </Button>
  )
}

