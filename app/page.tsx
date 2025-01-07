import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-center mb-8">
        Inward/Outward Document Management System
      </h1>
      <h2 className="text-2xl text-center mb-8">
        Welcome
      </h2>
      <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Login
      </Link>
    </main>
  )
}

