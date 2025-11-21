"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Search, ShoppingBag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/components/ui/button" // Re-using cn from button for simplicity or import from utils if moved

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md border-b border-border py-2"
                    : "bg-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 rounded-lg">
                        <ShoppingBag className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-foreground">
                        Gharpe
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/User"
                        className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                    >
                        Services
                    </Link>
                    <Link
                        href="#"
                        className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                    >
                        Partner with us
                    </Link>
                    <Link
                        href="#"
                        className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                    >
                        Ride with us
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 text-slate-300 hover:text-white cursor-pointer transition-colors">
                        <span className="text-sm font-medium">Get the App</span>
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1 11L11 1M11 1H3.5M11 1V8.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <Button variant="default" className="font-semibold">
                        Sign In
                    </Button>

                    <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </nav>
    )
}
