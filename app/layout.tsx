import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next' // Type for metadata in Next.js
import Link from 'next/link'

// Load Inter font
const inter = Inter({ subsets: ['latin'] })

// Metadata for the application
export const metadata: Metadata = {
  title: 'Document Management System',
  description: 'Inward/Outward Document Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Add custom favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        {/* Header */}
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-lg font-bold">
              <Link href="/">Document Management System</Link>
            </h1>
            <nav>
              <Link href="/dashboard" className="px-3 py-2 hover:underline">Home</Link>
              <Link href="/about" className="px-3 py-2 hover:underline">About</Link>
              <Link href="/dashboard" className="px-3 py-2 hover:underline">Dashboard</Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto p-4">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>© {new Date().getFullYear()} <a href="https://www.aitechnobyte.com">AiTechnoByte</a> All rights reserved. Developed by <a href="https://github.com/kirish93">kirish93</a></p>
            <p>
              <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link> | 
              <Link href="/terms" className="hover:underline"> Terms of Service</Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
