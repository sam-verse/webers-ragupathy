import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import Head from "next/head"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ragupathy | Webers - Electrical Solutions",
  description:
    "Digital visiting card for Ragupathy, Managing Director of Webers - Powering Progress, Securing the Future",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/public/images/logo.png" type="image/png" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
