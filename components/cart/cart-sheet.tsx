"use client"

import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function CartSheet() {
    const { items, removeItem, updateQuantity, cartTotal, itemCount } = useCart()
    const { user } = useAuth()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {itemCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs"
                        >
                            {itemCount}
                        </Badge>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>Your Cart ({itemCount})</SheetTitle>
                </SheetHeader>
                <Separator className="my-4" />
                {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center space-y-4">
                        <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                        <p className="text-lg font-medium text-muted-foreground">
                            Your cart is empty
                        </p>
                        <SheetClose asChild>
                            <Button variant="outline">Continue Shopping</Button>
                        </SheetClose>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 pr-4">
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-4">
                                        {/* Placeholder for image */}
                                        <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">
                                            Img
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <h4 className="text-sm font-medium leading-none">
                                                {item.name}
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                ${item.price.toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() =>
                                                    updateQuantity(item.id, item.quantity - 1)
                                                }
                                            >
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="w-4 text-center text-sm">
                                                {item.quantity}
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() =>
                                                    updateQuantity(item.id, item.quantity + 1)
                                                }
                                            >
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="space-y-4 pt-4">
                            <Separator />
                            <div className="flex items-center justify-between text-base font-medium">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Link href={`/${user?.id}/checkout`} className="w-full">
                                        <Button className="w-full" size="lg">
                                            Checkout
                                        </Button>
                                    </Link>
                                </SheetClose>
                            </SheetFooter>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    )
}
