"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersManagement } from "@/components/admin/users-management"
import { DataManagement } from "@/components/admin/data-management"
import { SystemSettings } from "@/components/admin/system-settings"

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("users")

    return (
        <div className="flex h-screen flex-col">
            <Navbar />
            <main className="flex-1 overflow-y-auto bg-muted/30">
                <div className="mx-auto max-w-7xl p-6 space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
                        <p className="mt-2 text-muted-foreground">Manage users, data layers, and system configuration</p>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full max-w-md grid-cols-3">
                            <TabsTrigger value="users">Users</TabsTrigger>
                            <TabsTrigger value="data">Data</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                        </TabsList>

                        <TabsContent value="users" className="mt-6">
                            <UsersManagement />
                        </TabsContent>

                        <TabsContent value="data" className="mt-6">
                            <DataManagement />
                        </TabsContent>

                        <TabsContent value="settings" className="mt-6">
                            <SystemSettings />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}
