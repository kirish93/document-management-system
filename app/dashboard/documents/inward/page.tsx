'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function InwardDocumentForm() {
  const [formData, setFormData] = useState({
    documentName: '',
    fromWhere: '',
    toWhere: '',
    frangDate: '',
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, type: 'inward' }),
    })

    if (response.ok) {
      router.push('/dashboard/documents')
    } else {
      // Handle error
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Enter Inward Document</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="documentName"
          value={formData.documentName}
          onChange={handleChange}
          placeholder="Document Name"
          required
        />
        <Input
          name="fromWhere"
          value={formData.fromWhere}
          onChange={handleChange}
          placeholder="From Where"
          required
        />
        <Input
          name="toWhere"
          value={formData.toWhere}
          onChange={handleChange}
          placeholder="To Where"
          required
        />
        <Input
          type="date"
          name="frangDate"
          value={formData.frangDate}
          onChange={handleChange}
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}

