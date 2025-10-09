"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompareView } from "@/components/analysis/compare-view"
import { RecommendationsView } from "@/components/analysis/recommendations-view"
import { ForecastView } from "@/components/analysis/forecast-view"

export default function AnalysisPage() {
    const [activeTab, setActiveTab] = useState("compare")

    return (
        <div className="flex h-screen flex-col">
            <Navbar />
            <main className="flex-1 overflow-y-auto bg-muted/30">
                <div className="mx-auto max-w-7xl p-6 space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Location Analysis</h1>
                        <p className="mt-2 text-muted-foreground">
                            Compare locations, view recommendations, and forecast demand trends
                        </p>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full max-w-md grid-cols-3">
                            <TabsTrigger value="compare">Compare</TabsTrigger>
                            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                            <TabsTrigger value="forecast">Forecast</TabsTrigger>
                        </TabsList>

                        <TabsContent value="compare" className="mt-6">
                            <CompareView />
                        </TabsContent>

                        <TabsContent value="recommendations" className="mt-6">
                            <RecommendationsView />
                        </TabsContent>

                        <TabsContent value="forecast" className="mt-6">
                            <ForecastView />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}
