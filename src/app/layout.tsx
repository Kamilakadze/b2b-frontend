import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import { AuthGuard } from "@/components/auth-guard"
import "./globals.css"

const inter = Inter({
    subsets: ["latin", "cyrillic"],
    variable: "--font-inter",
    display: "swap",
})

export const metadata: Metadata = {
    title: "CoworkWise - Coworking Location Intelligence",
    description: "AI-powered analytics platform for optimal coworking space location selection in Almaty",
    generator: "v0.app",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
        <body className={`font-sans ${inter.variable} antialiased`}>
        <Suspense fallback={null}>
            <AuthGuard>{children}</AuthGuard>
        </Suspense>
        </body>
        </html>
    )
}
