"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SignupPage() {
    const router = useRouter()

    useEffect(() => {
        // Redirect to login page since all auth methods are handled there
        router.push("/login")
    }, [router])

    return null
}
