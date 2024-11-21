import type { Metadata } from "next"
import { inter } from "@/fonts/inter"
import { jetBrainMono } from "@/fonts/jetbrain-mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        {children}
      </body>
    </html>
  )
}
