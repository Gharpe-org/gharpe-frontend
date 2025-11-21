"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
    return (
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#023047] pt-20">
            {/* Background Stars/Sparkles Effect */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full opacity-20"
                        initial={{
                            x: Math.random() * 1000 - 500,
                            y: Math.random() * 1000 - 500,
                            scale: Math.random() * 0.5 + 0.5,
                        }}
                        animate={{
                            opacity: [0.2, 0.8, 0.2],
                            scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            width: Math.random() * 4 + 2 + "px",
                            height: Math.random() * 4 + 2 + "px",
                            left: Math.random() * 100 + "%",
                            top: Math.random() * 100 + "%",
                        }}
                    />
                ))}
            </div>

            <div className="container relative z-10 px-4 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
                >
                    Your app for food , grocery , laundry and <br className="hidden md:block" />
                    many more...
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="max-w-xl mx-auto w-full relative group"
                >
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-500/30 transition-all duration-500" />
                    <div className="relative flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-full p-2 shadow-2xl">
                        <div className="pl-4 text-slate-300">
                            <MapPin className="h-6 w-6" />
                        </div>
                        <input
                            type="text"
                            placeholder="Enter your pincode"
                            className="flex-1 bg-transparent border-none text-white placeholder:text-slate-400 focus:ring-0 px-4 py-3 text-lg outline-none"
                        />
                        <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-none shadow-lg">
                            Find Services
                        </Button>
                    </div>
                    <p className="mt-4 text-slate-400 text-sm font-medium">
                        Enjoy your requirements from your vicinity
                    </p>
                </motion.div>
            </div>

            {/* Decorative Side Images (Placeholders for now) */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 hidden xl:block w-64 h-64 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block w-64 h-64 bg-gradient-to-bl from-green-400/20 to-transparent rounded-full blur-3xl pointer-events-none"
            />
        </section>
    )
}
