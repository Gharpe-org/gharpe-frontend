"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Utensils, ShoppingCart, Shirt, Pill } from "lucide-react"

const services = [
    {
        title: "Food",
        icon: Utensils,
        color: "from-orange-400 to-red-500",
        shadow: "shadow-orange-500/20",
        delay: 0.1,
    },
    {
        title: "Groceries",
        icon: ShoppingCart,
        color: "from-green-400 to-emerald-600",
        shadow: "shadow-green-500/20",
        delay: 0.2,
    },
    {
        title: "Laundry",
        icon: Shirt,
        color: "from-blue-400 to-indigo-600",
        shadow: "shadow-blue-500/20",
        delay: 0.3,
    },
    {
        title: "Emergency",
        icon: Pill,
        color: "from-red-400 to-rose-600",
        shadow: "shadow-red-500/20",
        delay: 0.4,
    },
]

export function ServiceGrid() {
    return (
        <section className="py-20 bg-[#023047]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                        What we Offer
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: service.delay }}
                            whileHover={{ y: -10 }}
                        >
                            <Card className="h-full overflow-hidden border-none bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm hover:bg-white/15 transition-colors duration-300 group cursor-pointer relative">
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${service.color}`} />

                                <CardContent className="p-8 flex flex-col items-center justify-center min-h-[300px] relative z-10">
                                    <h3 className="text-3xl font-bold text-white mb-8 drop-shadow-md">
                                        {service.title}
                                    </h3>

                                    <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center shadow-2xl ${service.shadow} group-hover:scale-110 transition-transform duration-500`}>
                                        <service.icon className="h-16 w-16 text-white" />
                                    </div>

                                    {/* Decorative elements */}
                                    <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
