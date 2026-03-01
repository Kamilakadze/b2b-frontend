"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, UserPlus, MoreVertical, Mail, Shield, User, Loader2, Trash2 } from "lucide-react"
import { api } from "@/lib/api"
import { useAuthStore } from "@/lib/store"

interface BackendUser {
    id: number
    email: string
    full_name: string | null
    is_admin: boolean
    is_active?: boolean
}

function mapBackendUser(u: BackendUser) {
    return {
        id: String(u.id),
        name: u.full_name || u.email,
        email: u.email,
        role: u.is_admin ? "admin" : "user",
        status: u.is_active !== false ? "active" : "inactive",
    }
}

export function UsersManagement() {
    const currentUser = useAuthStore((s) => s.user)
    const [users, setUsers] = useState<BackendUser[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [updatingId, setUpdatingId] = useState<number | null>(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [addEmail, setAddEmail] = useState("")
    const [addFullName, setAddFullName] = useState("")
    const [addPassword, setAddPassword] = useState("")
    const [addSubmitting, setAddSubmitting] = useState(false)
    const [deletingId, setDeletingId] = useState<number | null>(null)

    const loadUsers = async () => {
        setLoading(true)
        setError(null)
        try {
            const { data } = await api.get<BackendUser[]>("/users")
            setUsers(data)
        } catch (e: unknown) {
            const msg = e && typeof e === "object" && "response" in e
                ? (e as { response?: { data?: { detail?: string } } }).response?.data?.detail
                : null
            setError(typeof msg === "string" ? msg : "Failed to load users")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadUsers()
    }, [])

    const toggleAdmin = async (user: BackendUser) => {
        if (user.id === Number(currentUser?.id)) return
        setUpdatingId(user.id)
        setError(null)
        try {
            const { data } = await api.patch<BackendUser>(`/users/${user.id}/admin`, {
                is_admin: !user.is_admin,
            })
            setUsers((prev) => prev.map((u) => (u.id === data.id ? data : u)))
        } catch {
            setError("Failed to update role")
        } finally {
            setUpdatingId(null)
        }
    }

    const createUser = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!addEmail.trim() || !addPassword.trim()) return
        setAddSubmitting(true)
        setError(null)
        try {
            await api.post("/users", {
                email: addEmail.trim(),
                full_name: addFullName.trim() || null,
                password: addPassword,
            })
            setShowAddForm(false)
            setAddEmail("")
            setAddFullName("")
            setAddPassword("")
            loadUsers()
        } catch (e: unknown) {
            const msg =
                e && typeof e === "object" && "response" in e
                    ? (e as { response?: { data?: { detail?: string } } }).response?.data?.detail
                    : null
            setError(typeof msg === "string" ? msg : "Failed to create user")
        } finally {
            setAddSubmitting(false)
        }
    }

    const deleteUser = async (user: BackendUser) => {
        if (user.id === Number(currentUser?.id)) return
        if (!window.confirm(`Delete user ${user.full_name || user.email}? This cannot be undone.`)) return
        setDeletingId(user.id)
        setError(null)
        try {
            await api.delete(`/users/${user.id}`)
            setUsers((prev) => prev.filter((u) => u.id !== user.id))
        } catch {
            setError("Failed to delete user")
        } finally {
            setDeletingId(null)
        }
    }

    const mapped = users.map(mapBackendUser)
    const filteredUsers = searchQuery.trim()
        ? mapped.filter(
              (u) =>
                  u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  u.email.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        : mapped

    const totalUsers = users.length
    const activeCount = users.filter((u) => u.is_active !== false).length
    const adminCount = users.filter((u) => u.is_admin).length

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>User Management</CardTitle>
                            <CardDescription>Manage user accounts and permissions</CardDescription>
                        </div>
                        <Button className="gap-2" variant="outline" onClick={() => setShowAddForm(true)}>
                            <UserPlus className="h-4 w-4" />
                            Add User
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="mb-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                            {error}
                        </div>
                    )}

                    {showAddForm && (
                        <Card className="mb-6 border-primary/30">
                            <CardHeader className="pb-4">
                                <CardTitle>New user</CardTitle>
                                <CardDescription>Email and password are required. The user can change the password later in Profile.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={createUser} className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="add-email">Email</Label>
                                        <Input
                                            id="add-email"
                                            type="email"
                                            placeholder="user@example.com"
                                            value={addEmail}
                                            onChange={(e) => setAddEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="add-name">Full name (optional)</Label>
                                        <Input
                                            id="add-name"
                                            placeholder="Full name"
                                            value={addFullName}
                                            onChange={(e) => setAddFullName(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2 sm:col-span-2">
                                        <Label htmlFor="add-password">Password</Label>
                                        <Input
                                            id="add-password"
                                            type="password"
                                            placeholder="Initial password"
                                            value={addPassword}
                                            onChange={(e) => setAddPassword(e.target.value)}
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                    <div className="flex gap-2 sm:col-span-2">
                                        <Button type="submit" disabled={addSubmitting}>
                                            {addSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create"}
                                        </Button>
                                        <Button type="button" variant="outline" onClick={() => setShowAddForm(false)} disabled={addSubmitting}>
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    <div className="mb-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <div className="rounded-lg border">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="w-[50px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.map((user) => {
                                        const backendUser = users.find((u) => String(u.id) === user.id)!
                                        const isCurrentUser = currentUser && String(backendUser.id) === currentUser.id
                                        return (
                                            <TableRow key={user.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                                            <User className="h-5 w-5 text-primary" />
                                                        </div>
                                                        <span className="font-medium">{user.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <Mail className="h-4 w-4" />
                                                        {user.email}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={user.role === "admin" ? "default" : "secondary"} className="gap-1">
                                                        {user.role === "admin" && <Shield className="h-3 w-3" />}
                                                        {user.role}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={user.status === "active" ? "default" : "outline"}>
                                                        {user.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <MoreVertical className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                disabled={Boolean(isCurrentUser)}
                                                                onClick={() => toggleAdmin(backendUser)}
                                                            >
                                                                {updatingId === backendUser.id ? (
                                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                                ) : (
                                                                    <>
                                                                        {backendUser.is_admin ? "Remove admin" : "Make admin"}
                                                                    </>
                                                                )}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                className="text-destructive focus:text-destructive"
                                                                disabled={Boolean(isCurrentUser)}
                                                                onClick={() => deleteUser(backendUser)}
                                                            >
                                                                {deletingId === backendUser.id ? (
                                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                                ) : (
                                                                    <>
                                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                                        Delete user
                                                                    </>
                                                                )}
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalUsers}</div>
                        <p className="text-xs text-muted-foreground">from backend</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeCount}</div>
                        <p className="text-xs text-muted-foreground">
                            {totalUsers ? Math.round((activeCount / totalUsers) * 100) : 0}% of total
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Admins</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{adminCount}</div>
                        <p className="text-xs text-muted-foreground">System administrators</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
