"use client"

import { Navbar } from "@/components/navbar"
import { MapFilters } from "@/components/map-filters"
import { MapView } from "@/components/map-view"

export default function MapPage() {
    return (
        <div className="flex h-screen flex-col">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <aside className="w-80 border-r border-border bg-card p-4 overflow-y-auto">
                    <MapFilters />
                </aside>
                <main className="flex-1">
                    <MapView />
                </main>
            </div>
        </div>
    )
}
