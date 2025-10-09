"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

const forecastData = [
    { month: "Jan", actual: 8500, predicted: 8500, lower: 8200, upper: 8800 },
    { month: "Feb", actual: 8800, predicted: 8800, lower: 8500, upper: 9100 },
    { month: "Mar", actual: 9200, predicted: 9200, lower: 8900, upper: 9500 },
    { month: "Apr", actual: 9800, predicted: 9800, lower: 9500, upper: 10100 },
    { month: "May", actual: 10200, predicted: 10200, lower: 9900, upper: 10500 },
    { month: "Jun", actual: 10800, predicted: 10800, lower: 10500, upper: 11100 },
    { month: "Jul", actual: null, predicted: 11400, lower: 11000, upper: 11800 },
    { month: "Aug", actual: null, predicted: 12000, lower: 11500, upper: 12500 },
    { month: "Sep", actual: null, predicted: 12500, lower: 12000, upper: 13000 },
    { month: "Oct", actual: null, predicted: 13000, lower: 12400, upper: 13600 },
    { month: "Nov", actual: null, predicted: 13400, lower: 12800, upper: 14000 },
    { month: "Dec", actual: null, predicted: 13800, lower: 13200, upper: 14400 },
]

const demandByHour = [
    { hour: "6AM", demand: 15 },
    { hour: "8AM", demand: 45 },
    { hour: "10AM", demand: 75 },
    { hour: "12PM", demand: 85 },
    { hour: "2PM", demand: 80 },
    { hour: "4PM", demand: 70 },
    { hour: "6PM", demand: 50 },
    { hour: "8PM", demand: 30 },
    { hour: "10PM", demand: 15 },
]

export function ForecastView() {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Projected Growth</CardTitle>
                        <TrendingUp className="h-4 w-4 text-secondary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+28.5%</div>
                        <p className="text-xs text-muted-foreground">Next 6 months forecast</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Peak Demand</CardTitle>
                        <Activity className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12PM - 2PM</div>
                        <p className="text-xs text-muted-foreground">Highest occupancy period</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Confidence Level</CardTitle>
                        <TrendingDown className="h-4 w-4 text-warning" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">87%</div>
                        <p className="text-xs text-muted-foreground">Model accuracy score</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Demand Forecast</CardTitle>
                    <CardDescription>6-month footfall prediction with confidence intervals</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart data={forecastData}>
                            <defs>
                                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                            <XAxis dataKey="month" className="text-xs" />
                            <YAxis className="text-xs" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--card))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "var(--radius)",
                                }}
                            />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="upper"
                                stroke="none"
                                fill="hsl(var(--muted))"
                                fillOpacity={0.3}
                                name="Upper Bound"
                            />
                            <Area
                                type="monotone"
                                dataKey="lower"
                                stroke="none"
                                fill="hsl(var(--background))"
                                fillOpacity={1}
                                name="Lower Bound"
                            />
                            <Line
                                type="monotone"
                                dataKey="actual"
                                stroke="hsl(var(--secondary))"
                                strokeWidth={2}
                                dot={{ fill: "hsl(var(--secondary))", r: 4 }}
                                name="Actual"
                            />
                            <Line
                                type="monotone"
                                dataKey="predicted"
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                dot={{ fill: "hsl(var(--primary))", r: 4 }}
                                name="Predicted"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Hourly Demand Pattern</CardTitle>
                    <CardDescription>Average occupancy rate throughout the day</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={demandByHour}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                            <XAxis dataKey="hour" className="text-xs" />
                            <YAxis className="text-xs" domain={[0, 100]} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--card))",
                                    border: "1px solid hsl(var(--border))",
                                    borderRadius: "var(--radius)",
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="demand"
                                stroke="hsl(var(--secondary))"
                                strokeWidth={3}
                                dot={{ fill: "hsl(var(--secondary))", r: 5 }}
                                name="Occupancy %"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
