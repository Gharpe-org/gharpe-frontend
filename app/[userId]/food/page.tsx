"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/context/cart-context"

export default function FoodPage() {
    const { addItem } = useCart()

    const foodItems = [
        { id: "food-1", name: "Burger", price: 9.99 },
        { id: "food-2", name: "Pizza", price: 14.99 },
        { id: "food-3", name: "Pasta", price: 12.99 },
    ]

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Food Delivery</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {foodItems.map((item) => (
                    <Card key={item.id}>
                        <CardHeader>
                            <CardTitle>{item.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-32 bg-muted rounded-md flex items-center justify-center mb-4">
                                Food Image
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
