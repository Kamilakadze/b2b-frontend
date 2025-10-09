"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, TrendingUp, Users, DollarSign, Star } from "lucide-react"

const recommendations = [
    {
        id: "1",
        location: "Dostyk Avenue & Al-Farabi",
        district: "Medeu",
        score: 94,
        rating: "Excellent",
        reasons: [
            "High foot traffic during business hours",
            "Low competition in 1km radius",
            "Strong public transport connectivity",
            "Growing business district",
        ],
        metrics: {
            footfall: 15200,
            competition: 3,
            rent: 580,
            growth: "+18%",
        },
    },
    {
        id: "2",
        location: "Abay Avenue & Rozybakiev",
        district: "Almaly",
        score: 89,
        rating: "Very Good",
        reasons: ["Established business area", "Moderate rent prices", "Good infrastructure", "Stable demand"],
        metrics: {
            footfall: 11800,
            competition: 5,
            rent: 480,
            growth: "+12%",
        },
    },
    {
        id: "3",
        location: "Satpaev Street & Timiryazev",
        district: "Bostandyk",
        score: 86,
        rating: "Very Good",
        reasons: ["University proximity", "Young professional demographic", "Affordable rent", "Growing startup ecosystem"],
        metrics: {
            footfall: 9500,
            competition: 4,
            rent: 420,
            growth: "+22%",
        },
    },
]

export function RecommendationsView() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Top Location Recommendations</CardTitle>
                    <CardDescription>AI-powered suggestions based on market analysis and demand forecasting</CardDescription>
                </CardHeader>
            </Card>

            <div className="space-y-4">
                {recommendations.map((rec, index) => (
                    <Card key={rec.id} className="overflow-hidden">
                        <CardHeader className="bg-muted/50">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="bg-primary text-primary-foreground">
                                            #{index + 1}
                                        </Badge>
                                        <CardTitle className="text-xl">{rec.location}</CardTitle>
                                    </div>
                                    <CardDescription className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        {rec.district} District
                                    </CardDescription>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-2">
                                        <Star className="h-5 w-5 fill-warning text-warning" />
                                        <span className="text-2xl font-bold">{rec.score}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{rec.rating}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <h4 className="mb-3 font-semibold">Key Advantages</h4>
                                    <ul className="space-y-2">
                                        {rec.reasons.map((reason, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm">
                                                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                                <span className="text-muted-foreground">{reason}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="mb-3 font-semibold">Key Metrics</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-primary" />
                                                <span className="text-sm">Daily Footfall</span>
                                            </div>
                                            <span className="font-semibold">{rec.metrics.footfall.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="h-4 w-4 text-secondary" />
                                                <span className="text-sm">Growth Rate</span>
                                            </div>
                                            <span className="font-semibold text-secondary">{rec.metrics.growth}</span>
                                        </div>
                                        <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="h-4 w-4 text-warning" />
                                                <span className="text-sm">Avg Rent ($/m²)</span>
                                            </div>
                                            <span className="font-semibold">${rec.metrics.rent}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex gap-3">
                                <Button className="flex-1">View on Map</Button>
                                <Button variant="outline" className="flex-1 bg-transparent">
                                    Generate Report
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
