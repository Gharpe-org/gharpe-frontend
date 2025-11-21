"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { Loader2, Phone, Apple } from "lucide-react"

export default function LoginPage() {
  const { loginWithGoogle, loginWithApple, loginWithPhone, verifyPhoneOTP, user, isAuthenticated, phoneNumberForOTP } = useAuth()
  const router = useRouter()
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isAppleLoading, setIsAppleLoading] = useState(false)
  const [isPhoneLoading, setIsPhoneLoading] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otpCode, setOtpCode] = useState("")
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push(`/${user.id}`)
    }
  }, [isAuthenticated, user, router])

  useEffect(() => {
    if (phoneNumberForOTP) {
      setShowOtpDialog(true)
    } else {
      setShowOtpDialog(false)
    }
  }, [phoneNumberForOTP])

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    setError(null)
    try {
      console.log("🔵 Starting Google login...")
      await loginWithGoogle()
      console.log("✅ Google login successful!")
    } catch (error: any) {
      console.error("❌ Google login failed:", error)
      console.error("Error code:", error.code)
      console.error("Error message:", error.message)

      // Provide user-friendly error messages based on error code
      let userMessage = "Google login failed. Please try again."
      if (error.code === 'auth/popup-closed-by-user') {
        userMessage = "Sign-in popup was closed. Please try again."
      } else if (error.code === 'auth/unauthorized-domain') {
        userMessage = "This domain is not authorized. Please contact support."
      } else if (error.code === 'auth/cancelled-popup-request') {
        userMessage = "Only one popup is allowed at a time."
      } else if (error.message) {
        userMessage = error.message
      }

      setError(userMessage)
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const handleAppleLogin = async () => {
    setIsAppleLoading(true)
    setError(null)
    try {
      await loginWithApple()
    } catch (error: any) {
      console.error("Apple login failed", error)
      setError(error.message || "Apple login failed. Please try again.")
    } finally {
      setIsAppleLoading(false)
    }
  }

  const handlePhoneLogin = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid phone number with country code (e.g., +1234567890)")
      return
    }

    setIsPhoneLoading(true)
    setError(null)
    try {
      await loginWithPhone(phoneNumber)
      // OTP dialog will show automatically via useEffect
    } catch (error: any) {
      console.error("Phone login failed", error)
      setError(error.message || "Failed to send OTP. Please try again.")
    } finally {
      setIsPhoneLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otpCode || otpCode.length !== 6) {
      setError("Please enter a valid 6-digit OTP code")
      return
    }

    setError(null)
    try {
      await verifyPhoneOTP(otpCode)
      setShowOtpDialog(false)
      setOtpCode("")
    } catch (error: any) {
      console.error("OTP verification failed", error)
      setError(error.message || "Invalid OTP code. Please try again.")
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      {/* Hidden recaptcha container for phone auth */}
      <div id="recaptcha-container"></div>

      <Card className="w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome to Gharpe</CardTitle>
          <CardDescription>
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Google Sign-In */}
          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="w-full"
          >
            {isGoogleLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
            )}
            Continue with Google
          </Button>

          {/* Apple Sign-In */}
          <Button
            variant="outline"
            onClick={handleAppleLogin}
            disabled={isAppleLoading}
            className="w-full"
          >
            {isAppleLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Apple className="mr-2 h-4 w-4" />
            )}
            Continue with Apple
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with phone
              </span>
            </div>
          </div>

          {/* Phone Sign-In */}
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="flex gap-2">
              <Input
                id="phone"
                type="tel"
                placeholder="+1234567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={isPhoneLoading}
              />
              <Button
                onClick={handlePhoneLogin}
                disabled={isPhoneLoading}
                className="whitespace-nowrap"
              >
                {isPhoneLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Phone className="mr-2 h-4 w-4" />
                    Send OTP
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Enter your phone number with country code (e.g., +1 for US)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* OTP Verification Dialog */}
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Phone Number</DialogTitle>
            <DialogDescription>
              Enter the 6-digit code sent to {phoneNumberForOTP}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="otp">OTP Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                className="text-center text-2xl tracking-widest"
              />
            </div>
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowOtpDialog(false)
              setOtpCode("")
              setError(null)
            }}>
              Cancel
            </Button>
            <Button onClick={handleVerifyOTP}>
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}