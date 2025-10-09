"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
} from "recharts"

const comparisonData = [
    {
        location: "Almaly",
        footfall: 8500,
        coworkings: 12,
        avgRent: 450,
        competition: 7,
    },
    {
        location: "Bostandyk",
        footfall: 12000,
        coworkings: 18,
        avgRent: 650,
        competition: 9,
    },
    {
        location: "Medeu",
        footfall: 6800,
        coworkings: 8,
        avgRent: 550,
        competition: 5,
    },
    {
        location: "Auezov",
        footfall: 9200,
        coworkings: 14,
        avgRent: 420,
        competition: 6,
    },
]

const radarData = [
    {
        metric: "Accessibility",
        Almaly: 85,
        Bostandyk: 92,
        Medeu: 78,
    },
    {
        metric: "Foot Traffic",
        Almaly: 75,
        Bostandyk: 95,
        Medeu: 65,
    },
    {
        metric: "Infrastructure",
        Almaly: 80,
        Bostandyk: 88,
        Medeu: 85,
    },
    {
        metric: "Competition",
        Almaly: 70,
        Bostandyk: 60,
        Medeu: 80,
    },
    {
        metric: "Cost Efficiency",
        Almaly: 85,
        Bostandyk: 65,
        Medeu: 75,
    },
]

export function CompareView() {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {comparisonData.map((location) => (
                    <Card key={location.location}>
                        <CardHeader>
                            <CardTitle className="text-lg">{location.location}</CardTitle>
                            <CardDescription>District Overview</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Daily Footfall</span>
                                <span className="font-semibold">{location.footfall.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Coworkings</span>
                                <span className="font-semibold">{location.coworkings}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Avg Rent ($/m²)</span>
                                <span className="font-semibold">${location.avgRent}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Competition</span>
                                <span className="font-semibold">{location.competition}/10</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Footfall Comparison</CardTitle>
                    <CardDescription>Daily average foot traffic by district</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={comparisonData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                            <XAxis dataKey="location" className="text-xs" />
                            <YAxis className="text-xs" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--card))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "var(--radius)",
                                }}
                            />
                            <Legend />
                            <Bar dataKey="footfall" fill="hsl(var(--primary))" name="Daily Footfall" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Multi-Factor Analysis</CardTitle>
                    <CardDescription>Comprehensive comparison across key metrics</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                        <RadarChart data={radarData}>
                            <PolarGrid className="stroke-border" />
                            <PolarAngleAxis dataKey="metric" className="text-xs" />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
                            <Radar
                                name="Almaly"
                                dataKey="Almaly"
                                stroke="hsl(var(--primary))"
                                fill="hsl(var(--primary))"
                                fillOpacity={0.3}
                            />
                            <Radar
                                name="Bostandyk"
                                dataKey="Bostandyk"
                                stroke="hsl(var(--secondary))"
                                fill="hsl(var(--secondary))"
                                fillOpacity={0.3}
                            />
                            <Radar
                                name="Medeu"
                                dataKey="Medeu"
                                stroke="hsl(var(--warning))"
                                fill="hsl(var(--warning))"
                                fillOpacity={0.3}
                            />
                            <Legend />
                        </RadarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
