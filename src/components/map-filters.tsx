"use client"

import { Sliders, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useMapStore } from "@/lib/store"

const districts = [
    { value: "all", label: "All Districts" },
    { value: "almaly", label: "Almaly District" },
    { value: "auezov", label: "Auezov District" },
    { value: "bostandyk", label: "Bostandyk District" },
    { value: "medeu", label: "Medeu District" },
    { value: "turksib", label: "Turksib District" },
]

const timeOptions = [
    { value: "all", label: "All Day" },
    { value: "morning", label: "Morning (6-12)" },
    { value: "afternoon", label: "Afternoon (12-18)" },
    { value: "evening", label: "Evening (18-24)" },
]

export function MapFilters() {
    const { selectedDistrict, radius, timeOfDay, setSelectedDistrict, setRadius, setTimeOfDay } = useMapStore()

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Sliders className="h-5 w-5" />
                    Filters
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="district" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        District
                    </Label>
                    <Select value={selectedDistrict || "all"} onValueChange={setSelectedDistrict}>
                        <SelectTrigger id="district">
                            <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                            {districts.map((district) => (
                                <SelectItem key={district.value} value={district.value}>
                                    {district.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-3">
                    <Label htmlFor="radius">Search Radius: {radius}m</Label>
                    <Slider
                        id="radius"
                        min={500}
                        max={5000}
                        step={500}
                        value={[radius]}
                        onValueChange={(value) => setRadius(value[0])}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>500m</span>
                        <span>5km</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="time" className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Time of Day
                    </Label>
                    <Select value={timeOfDay} onValueChange={setTimeOfDay}>
                        <SelectTrigger id="time">
                            <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                            {timeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="pt-4 border-t space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Active Coworkings</span>
                        <span className="font-semibold">4</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Avg. Occupancy</span>
                        <span className="font-semibold">72.5%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Hot Zones</span>
                        <span className="font-semibold">6</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
