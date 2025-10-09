"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MapPin, BarChart3, Settings, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function Navbar() {
    const pathname = usePathname()
    const { user, logout } = useAuthStore()

    const navigation = [
        { name: "Map", href: "/map", icon: MapPin },
        { name: "Analysis", href: "/analysis", icon: BarChart3 },
        { name: "Admin", href: "/admin", icon: Settings },
        { name: "Profile", href: "/profile", icon: User },
    ]

    return (
        <nav className="border-b border-border bg-card">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/map" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                                <MapPin className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold text-foreground">CoworkWise</span>
                        </Link>

                        <div className="hidden md:flex md:gap-1">
                            {navigation.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                            isActive
                                                ? "bg-primary text-primary-foreground"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                        )}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {user && (
                            <>
                                <div className="hidden md:block text-sm text-muted-foreground">{user.email}</div>
                                <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
