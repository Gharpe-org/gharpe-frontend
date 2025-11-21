import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils, ShoppingCart, Shirt, AlertCircle, User, Wallet, HelpCircle, FileText } from "lucide-react"

export default async function UserDashboard({
    params,
}: {
    params: Promise<{ userId: string }>
}) {
    const { userId } = await params

    const services = [
        { name: "Food Delivery", href: `/${userId}/food`, icon: Utensils, color: "text-orange-500" },
        { name: "Grocery", href: `/${userId}/grocery`, icon: ShoppingCart, color: "text-green-500" },
        { name: "Laundry", href: `/${userId}/laundry`, icon: Shirt, color: "text-blue-500" },
        { name: "Emergency", href: `/${userId}/emergency`, icon: AlertCircle, color: "text-red-500" },
    ]

    const userFeatures = [
        { name: "Profile", href: `/${userId}/profile`, icon: User },
        { name: "Orders", href: `/${userId}/orders`, icon: FileText },
        { name: "Wallet", href: `/${userId}/wallet`, icon: Wallet },
        { name: "Support", href: `/${userId}/support`, icon: HelpCircle },
    ]

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Welcome Back</h1>

            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Our Services</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {services.map((service) => (
                        <Link key={service.name} href={service.href}>
                            <Card className="hover:bg-accent transition-colors cursor-pointer h-full">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {service.name}
                                    </CardTitle>
                                    <service.icon className={`h-4 w-4 ${service.color}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        Access {service.name} services
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4">Account</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {userFeatures.map((feature) => (
                        <Link key={feature.name} href={feature.href}>
                            <Card className="hover:bg-accent transition-colors cursor-pointer h-full">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {feature.name}
                                    </CardTitle>
                                    <feature.icon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    )
}
