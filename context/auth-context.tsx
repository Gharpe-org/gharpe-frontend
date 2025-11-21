"use client"

import { createContext, useContext, useEffect, useState } from "react"
import {
    User as FirebaseUser,
    onAuthStateChanged,
    signInWithPopup,
    signOut as firebaseSignOut,
    signInWithPhoneNumber,
    ConfirmationResult,
    RecaptchaVerifier as FirebaseRecaptchaVerifier
} from "firebase/auth"
import { auth, googleProvider, appleProvider, RecaptchaVerifier } from "@/lib/firebase"
import { useRouter } from "next/navigation"

interface User {
    id: string
    name: string
    email: string
    image?: string
    role: string
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    loginWithGoogle: () => Promise<void>
    loginWithApple: () => Promise<void>
    loginWithPhone: (phoneNumber: string) => Promise<void>
    verifyPhoneOTP: (code: string) => Promise<void>
    logout: () => Promise<void>
    phoneNumberForOTP: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [recaptchaVerifier, setRecaptchaVerifier] = useState<FirebaseRecaptchaVerifier | null>(null)
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null)
    const [phoneNumberForOTP, setPhoneNumberForOTP] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Get ID token
                    const token = await firebaseUser.getIdToken()

                    // Verify with backend
                    const response = await fetch('http://localhost:3100/auth/verifyToken', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token }),
                    })

                    if (!response.ok) {
                        console.error("Backend returned error status:", response.status)
                        setUser(null)
                        return
                    }

                    const contentType = response.headers.get('content-type')
                    if (!contentType || !contentType.includes('application/json')) {
                        console.error("Backend didn't return JSON:", contentType)
                        setUser(null)
                        return
                    }

                    const data = await response.json()

                    if (data.success) {
                        setUser(data.user)
                    } else {
                        console.error("Backend verification failed:", data.message)
                        setUser(null)
                    }
                } catch (error) {
                    console.error("Error verifying token:", error)
                    setUser(null)
                }
            } else {
                setUser(null)
            }
            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const loginWithGoogle = async () => {
        try {
            console.log("Starting Google login...")
            const result = await signInWithPopup(auth, googleProvider)
            console.log("Google login successful:", result.user.email)
            // Navigation is handled by the useEffect or the component calling this
        } catch (error: any) {
            console.error("Google login failed:", error)
            console.error("Error code:", error.code)
            console.error("Error message:", error.message)
            throw error
        }
    }

    const loginWithApple = async () => {
        try {
            console.log("Starting Apple login...")
            const result = await signInWithPopup(auth, appleProvider)
            console.log("Apple login successful:", result.user.email)
            // Navigation is handled by the useEffect
        } catch (error: any) {
            console.error("Apple login failed:", error)
            console.error("Error code:", error.code)
            console.error("Error message:", error.message)
            throw error
        }
    }

    const loginWithPhone = async (phoneNumber: string) => {
        try {
            console.log("Starting phone login for:", phoneNumber)

            // Initialize RecaptchaVerifier if not already initialized
            if (!recaptchaVerifier) {
                const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                    size: 'invisible',
                    callback: () => {
                        console.log("reCAPTCHA solved")
                    }
                })
                setRecaptchaVerifier(verifier)

                const confirmation = await signInWithPhoneNumber(auth, phoneNumber, verifier)
                setConfirmationResult(confirmation)
                setPhoneNumberForOTP(phoneNumber)
                console.log("OTP sent to:", phoneNumber)
            } else {
                const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
                setConfirmationResult(confirmation)
                setPhoneNumberForOTP(phoneNumber)
                console.log("OTP sent to:", phoneNumber)
            }
        } catch (error: any) {
            console.error("Phone login failed:", error)
            console.error("Error code:", error.code)
            console.error("Error message:", error.message)
            // Reset recaptcha on error
            if (recaptchaVerifier) {
                recaptchaVerifier.clear()
                setRecaptchaVerifier(null)
            }
            throw error
        }
    }

    const verifyPhoneOTP = async (code: string) => {
        try {
            if (!confirmationResult) {
                throw new Error("No confirmation result. Please request OTP first.")
            }

            console.log("Verifying OTP code...")
            await confirmationResult.confirm(code)
            console.log("Phone verification successful")

            // Clean up
            setConfirmationResult(null)
            setPhoneNumberForOTP(null)
            // Navigation is handled by the useEffect
        } catch (error: any) {
            console.error("OTP verification failed:", error)
            console.error("Error code:", error.code)
            console.error("Error message:", error.message)
            throw error
        }
    }

    const logout = async () => {
        try {
            await firebaseSignOut(auth)
            setUser(null)
            router.push("/login")
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            loginWithGoogle,
            loginWithApple,
            loginWithPhone,
            verifyPhoneOTP,
            logout,
            phoneNumberForOTP
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
