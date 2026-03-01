"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin } from "lucide-react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/lib/store"

export default function RegisterPage() {
    const router = useRouter()
    const register = useAuthStore((state) => state.register)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters")
            return
        }

        setIsLoading(true)

        try {
            await register(email, password, fullName || undefined)
            router.push("/map")
        } catch (err: unknown) {
            const message = axios.isAxiosError(err) && err.response?.data?.detail
                ? (typeof err.response.data.detail === "string" ? err.response.data.detail : "Registration failed.")
                : "Registration failed. Please try again."
            setError(message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-4 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
                        <MapPin className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
                        <CardDescription className="mt-2 text-base">
                            Join CoworkWise to access location intelligence
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full name (optional)</Label>
                            <Input
                                id="fullName"
                                type="text"
                                placeholder="Your name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="h-11"
                            />
                        </div>

                        {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

                        <Button
                            type="submit"
                            className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating account..." : "Sign up"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        <p>
                            Already have an account?{" "}
                            <button onClick={() => router.push("/login")} className="text-primary hover:underline font-medium">
                                Sign in
                            </button>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
