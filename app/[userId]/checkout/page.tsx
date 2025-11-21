"use client"

import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
    const { items, cartTotal, coupon, discount, applyCoupon, removeCoupon, clearCart } = useCart()
    const { user } = useAuth()
    const [couponInput, setCouponInput] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const discountAmount = cartTotal * discount
    const finalTotal = cartTotal - discountAmount

    const handleApplyCoupon = () => {
        const success = applyCoupon(couponInput)
        if (!success) {
            alert("Invalid coupon code")
        } else {
            setCouponInput("")
        }
    }

    const handleCheckout = () => {
        setIsProcessing(true)
        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false)
            setIsSuccess(true)
            clearCart()
        }, 2000)
    }

    if (isSuccess) {
        return (
            <div className="container mx-auto py-16 px-4 flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <span className="text-4xl">🎉</span>
                </div>
                <h1 className="text-3xl font-bold">Order Confirmed!</h1>
                <p className="text-muted-foreground max-w-md">
                    Thank you for your order. You will receive a confirmation email shortly.
                </p>
                <Link href={`/${user?.id}`}>
                    <Button className="mt-8">Back to Home</Button>
                </Link>
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="container mx-auto py-16 px-4 flex flex-col items-center justify-center text-center space-y-4">
                <h1 className="text-2xl font-bold">Your cart is empty</h1>
                <Link href={`/${user?.id}`}>
                    <Button variant="outline">Continue Shopping</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <Link href={`/${user?.id}`} className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Shopping
                </Link>
            </div>

            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" placeholder="123 Main St" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" placeholder="New York" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">Zip Code</Label>
                                    <Input id="zip" placeholder="10001" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-4 p-4 border rounded-md bg-muted/50">
                                <div className="h-8 w-12 bg-white rounded border flex items-center justify-center font-bold text-xs">
                                    CASH
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">Cash on Delivery</p>
                                    <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span>{item.quantity}x {item.name}</span>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                {coupon && (
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span>Discount ({coupon})</span>
                                        <span>-${discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-bold text-lg pt-2">
                                    <span>Total</span>
                                    <span>${finalTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <Label>Coupon Code</Label>
                                <div className="flex space-x-2">
                                    <Input
                                        placeholder="Enter code"
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value)}
                                        disabled={!!coupon}
                                    />
                                    <Button variant="outline" onClick={handleApplyCoupon} disabled={!!coupon}>
                                        Apply
                                    </Button>
                                </div>
                                {coupon && (
                                    <div className="flex items-center justify-between text-xs bg-green-100 text-green-800 p-2 rounded">
                                        <span>Applied: {coupon}</span>
                                        <button onClick={removeCoupon} className="hover:underline">Remove</button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isProcessing}>
                                {isProcessing ? "Processing..." : `Place Order ($${finalTotal.toFixed(2)})`}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
