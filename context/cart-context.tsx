"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image?: string
}

interface CartContextType {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    cartTotal: number
    itemCount: number
    coupon: string | null
    applyCoupon: (code: string) => boolean
    removeCoupon: () => void
    discount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [coupon, setCoupon] = useState<string | null>(null)
    const [discount, setDiscount] = useState(0)

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                console.error("Failed to parse cart from local storage", e)
            }
        }
    }, [])

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items))
    }, [items])

    const addItem = (newItem: CartItem) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === newItem.id)
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prevItems, { ...newItem, quantity: 1 }]
        })
    }

    const removeItem = (id: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) {
            removeItem(id)
            return
        }
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => {
        setItems([])
        setCoupon(null)
        setDiscount(0)
    }

    const cartTotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )

    const itemCount = items.reduce((count, item) => count + item.quantity, 0)

    const applyCoupon = (code: string): boolean => {
        // Mock coupon logic
        if (code.toUpperCase() === "SAVE10") {
            setCoupon("SAVE10")
            setDiscount(0.1) // 10% discount
            return true
        }
        if (code.toUpperCase() === "WELCOME50") {
            setCoupon("WELCOME50")
            setDiscount(0.5) // 50% discount
            return true
        }
        return false
    }

    const removeCoupon = () => {
        setCoupon(null)
        setDiscount(0)
    }

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                cartTotal,
                itemCount,
                coupon,
                applyCoupon,
                removeCoupon,
                discount,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
