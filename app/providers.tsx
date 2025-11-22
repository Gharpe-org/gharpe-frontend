"use client"

import { ThemeProvider } from "next-themes"
import { AuthProvider } from "@/context/auth-context"
import { CartProvider } from "@/context/cart-context"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <AuthProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}
