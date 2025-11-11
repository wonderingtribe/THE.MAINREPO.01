import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Providers } from '@/app/providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

export const metadata: Metadata = {
  title: 'WonderSpace - AI-Powered No-Code Builder',
  description: 'Build beautiful apps, agents, and websites with AI. Drag-and-drop visual builder with AI code generation.',
  keywords: ['builder', 'no-code', 'AI', 'web builder', 'app builder'],
  authors: [{ name: 'AI WONDER LABS' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#1f2937" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}