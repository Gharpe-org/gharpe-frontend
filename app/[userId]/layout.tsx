"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CartProvider } from "@/context/cart-context"
import { VoiceAssistant } from "@/components/ai/voice-assistant"
import { useAuth } from "@/context/auth-context"
import { useRouter, useParams } from "next/navigation"
import { useEffect } from "react"

export default function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isAuthenticated, isLoading, user } = useAuth()
    const router = useRouter()
    const params = useParams()

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push("/login")
            } else if (user && params.userId !== user.id) {
                // Redirect to the correct user ID if trying to access another user's route
                router.push(`/${user.id}`)
            }
        }
    }, [isAuthenticated, isLoading, router, user, params.userId])

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>
    }

    if (!isAuthenticated) {
        return null
    }

    return (
        <CartProvider>
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1 pt-16">{children}</main>
                <Footer />
                <VoiceAssistant />
            </div>
        </CartProvider>
    )
}
