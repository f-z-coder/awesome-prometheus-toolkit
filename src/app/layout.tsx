import type { Metadata } from "next"
import { inter } from "@/fonts/inter"
import { jetBrainMono } from "@/fonts/jetbrain-mono"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"

export const metadata: Metadata = {
  title: "Awesome Prometheus Toolkit",
  description: "A toolkit for Prometheus rules and alerts",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetBrainMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
