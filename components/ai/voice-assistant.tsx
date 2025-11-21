"use client"

import { useState, useEffect } from "react"
import { Mic, X, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useCart } from "@/context/cart-context"

export function VoiceAssistant() {
    const [isOpen, setIsOpen] = useState(false)
    const [status, setStatus] = useState<"idle" | "listening" | "processing" | "success">("idle")
    const [transcript, setTranscript] = useState("")
    const { addItem } = useCart()

    useEffect(() => {
        if (isOpen && status === "idle") {
            setStatus("listening")
            setTranscript("Listening...")

            // Simulate listening delay
            const listeningTimer = setTimeout(() => {
                setStatus("processing")
                setTranscript("Processing your order...")
            }, 3000)

            // Simulate processing delay
            const processingTimer = setTimeout(() => {
                setStatus("success")
                setTranscript("Added 1x Pizza to your cart!")
                // Mock adding item
                addItem({
                    id: "pizza-1",
                    name: "Pepperoni Pizza",
                    price: 15.99,
                    quantity: 1,
                })
            }, 6000)

            // Reset after success
            const closeTimer = setTimeout(() => {
                setIsOpen(false)
                setStatus("idle")
                setTranscript("")
            }, 8000)

            return () => {
                clearTimeout(listeningTimer)
                clearTimeout(processingTimer)
                clearTimeout(closeTimer)
            }
        }
    }, [isOpen, status, addItem])

    const resetAssistant = () => {
        setIsOpen(false)
        setStatus("idle")
        setTranscript("")
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    size="icon"
                    className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 z-50"
                >
                    <Mic className="h-6 w-6 text-white" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-black/90 border-zinc-800 text-white backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-light">
                        AI Assistant
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center py-8 space-y-6">
                    <div className="relative">
                        {status === "listening" && (
                            <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping" />
                        )}
                        <div className={`
              relative flex items-center justify-center h-24 w-24 rounded-full border-2 transition-all duration-500
              ${status === "listening" ? "border-purple-500 bg-purple-500/10" :
                                status === "processing" ? "border-blue-500 bg-blue-500/10" :
                                    status === "success" ? "border-green-500 bg-green-500/10" : "border-zinc-700"}
            `}>
                            {status === "listening" && <Mic className="h-10 w-10 text-purple-500 animate-pulse" />}
                            {status === "processing" && <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />}
                            {status === "success" && <CheckCircle2 className="h-10 w-10 text-green-500" />}
                        </div>
                    </div>

                    <div className="text-center space-y-2">
                        <p className="text-lg font-medium animate-fade-in">
                            {transcript}
                        </p>
                        {status === "listening" && (
                            <p className="text-sm text-zinc-400">
                                Try saying "Order a large pepperoni pizza"
                            </p>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
