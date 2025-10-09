"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/lib/store"
import { Mail, Shield, Calendar, Activity, MapPin, BarChart3, Save, LogOut } from "lucide-react"

export default function ProfilePage() {
    const router = useRouter()
    const { user, logout } = useAuthStore()
    const [activeTab, setActiveTab] = useState("profile")

    const handleLogout = () => {
        logout()
        router.push("/login")
    }

    const recentActivity = [
        { id: "1", action: "Viewed location analysis", location: "Dostyk Avenue", time: "2 hours ago" },
        { id: "2", action: "Generated forecast report", location: "Bostandyk District", time: "5 hours ago" },
        { id: "3", action: "Compared districts", location: "Multiple locations", time: "1 day ago" },
        { id: "4", action: "Updated map filters", location: "Almaty", time: "2 days ago" },
    ]

    const savedLocations = [
        { id: "1", name: "Dostyk Avenue & Al-Farabi", district: "Medeu", score: 94 },
        { id: "2", name: "Abay Avenue & Rozybakiev", district: "Almaly", score: 89 },
        { id: "3", name: "Satpaev Street & Timiryazev", district: "Bostandyk", score: 86 },
    ]

    return (
        <div className="flex h-screen flex-col">
            <Navbar />
            <main className="flex-1 overflow-y-auto bg-muted/30">
                <div className="mx-auto max-w-5xl p-6 space-y-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-6">
                                <Avatar className="h-24 w-24">
                                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                                        {user?.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-2xl font-bold">{user?.name}</h1>
                                        <Badge variant={user?.role === "admin" ? "default" : "secondary"} className="gap-1">
                                            {user?.role === "admin" && <Shield className="h-3 w-3" />}
                                            {user?.role}
                                        </Badge>
                                    </div>
                                    <p className="mt-1 text-muted-foreground flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        {user?.email}
                                    </p>
                                    <div className="mt-4">
                                        <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
                                            <LogOut className="h-4 w-4" />
                                            Log out
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full max-w-md grid-cols-3">
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="activity">Activity</TabsTrigger>
                            <TabsTrigger value="saved">Saved</TabsTrigger>
                        </TabsList>

                        <TabsContent value="profile" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Information</CardTitle>
                                    <CardDescription>Update your personal information and preferences</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input id="name" defaultValue={user?.name} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" defaultValue={user?.email} />
                                        </div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input id="phone" placeholder="+7 (XXX) XXX-XX-XX" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="company">Company</Label>
                                            <Input id="company" placeholder="Your company name" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Input id="bio" placeholder="Tell us about yourself" />
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <Button variant="outline">Cancel</Button>
                                        <Button className="gap-2">
                                            <Save className="h-4 w-4" />
                                            Save Changes
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="mt-6">
                                <CardHeader>
                                    <CardTitle>Change Password</CardTitle>
                                    <CardDescription>Update your password to keep your account secure</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="current-password">Current Password</Label>
                                        <Input id="current-password" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">New Password</Label>
                                        <Input id="new-password" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                                        <Input id="confirm-password" type="password" />
                                    </div>
                                    <Button>Update Password</Button>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="activity" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Activity className="h-5 w-5" />
                                        Recent Activity
                                    </CardTitle>
                                    <CardDescription>Your recent actions and interactions</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recentActivity.map((activity) => (
                                            <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                                    <BarChart3 className="h-5 w-5 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium">{activity.action}</p>
                                                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                                        <MapPin className="h-3 w-3" />
                                                        {activity.location}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Calendar className="h-4 w-4" />
                                                    {activity.time}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="saved" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Saved Locations</CardTitle>
                                    <CardDescription>Your bookmarked locations and recommendations</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {savedLocations.map((location) => (
                                            <div key={location.id} className="flex items-center justify-between rounded-lg border p-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                                        <MapPin className="h-6 w-6 text-primary" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold">{location.name}</h4>
                                                        <p className="text-sm text-muted-foreground">{location.district} District</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <p className="text-sm text-muted-foreground">Score</p>
                                                        <p className="text-xl font-bold">{location.score}</p>
                                                    </div>
                                                    <Button variant="outline" size="sm">
                                                        View Details
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}
