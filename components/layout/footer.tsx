import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white">Gharpe</h3>
                        <p className="text-slate-400 text-sm">
                            Your app for food, grocery, laundry and many more...
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">About Gharpe</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="#" className="hover:text-white transition-colors">Who We Are</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Work With Us</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Investor Relations</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Report Fraud</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Learn More</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Sitemap</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Social Links</h4>
                        <div className="flex gap-4">
                            <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Link>
                        </div>
                        <div className="mt-6">
                            <h5 className="text-sm font-semibold text-white mb-2">Get the App</h5>
                            <div className="flex flex-col gap-2">
                                {/* Placeholders for App Store badges */}
                                <div className="h-10 w-32 bg-slate-800 rounded-md animate-pulse"></div>
                                <div className="h-10 w-32 bg-slate-800 rounded-md animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Gharpe Technologies Pvt. Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
