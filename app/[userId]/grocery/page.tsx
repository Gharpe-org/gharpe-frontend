"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/context/cart-context"

export default function GroceryPage() {
    const { addItem } = useCart()

    const groceryItems = [
        { id: "gro-1", name: "Milk", price: 2.99 },
        { id: "gro-2", name: "Bread", price: 1.99 },
        { id: "gro-3", name: "Eggs (Dozen)", price: 4.99 },
    ]

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Grocery</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {groceryItems.map((item) => (
                    <Card key={item.id}>
                        <CardHeader>
                            <CardTitle>{item.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-32 bg-muted rounded-md flex items-center justify-center mb-4">
                                Grocery Image
                            </div>
                            <p className="text-lg font-bold">${item.price}</p>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full"
                                onClick={() => addItem({ ...item, quantity: 1 })}
                            >
                                Add to Cart
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
