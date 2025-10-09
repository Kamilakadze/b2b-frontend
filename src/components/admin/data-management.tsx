"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Upload, Database, RefreshCw, Download, Layers, Calendar } from "lucide-react"

const dataLayers = [
    {
        id: "1",
        name: "Footfall Heatmap",
        type: "Heatmap",
        status: "active",
        lastUpdated: "2024-01-15",
        records: 125000,
    },
    {
        id: "2",
        name: "Coworking Locations",
        type: "Points",
        status: "active",
        lastUpdated: "2024-01-14",
        records: 48,
    },
    {
        id: "3",
        name: "Public Transport",
        type: "Lines",
        status: "active",
        lastUpdated: "2024-01-10",
        records: 320,
    },
    {
        id: "4",
        name: "Business Districts",
        type: "Polygons",
        status: "inactive",
        lastUpdated: "2023-12-28",
        records: 12,
    },
]

export function DataManagement() {
    const [layers, setLayers] = useState(dataLayers)

    const toggleLayer = (id: string) => {
        setLayers(
            layers.map((layer) =>
                layer.id === id ? { ...layer, status: layer.status === "active" ? "inactive" : "active" } : layer,
            ),
        )
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Data Layers</CardTitle>
                            <CardDescription>Manage map data layers and datasets</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="gap-2 bg-transparent">
                                <Download className="h-4 w-4" />
                                Export
                            </Button>
                            <Button className="gap-2">
                                <Upload className="h-4 w-4" />
                                Upload Data
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {layers.map((layer) => (
                            <div key={layer.id} className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                        <Layers className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold">{layer.name}</h4>
                                            <Badge variant="outline">{layer.type}</Badge>
                                        </div>
                                        <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Database className="h-3 w-3" />
                          {layer.records.toLocaleString()} records
                      </span>
                                            <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Updated {layer.lastUpdated}
                      </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Switch
                                            id={`layer-${layer.id}`}
                                            checked={layer.status === "active"}
                                            onCheckedChange={() => toggleLayer(layer.id)}
                                        />
                                        <Label htmlFor={`layer-${layer.id}`} className="cursor-pointer">
                                            {layer.status === "active" ? "Enabled" : "Disabled"}
                                        </Label>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <RefreshCw className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Upload New Data</CardTitle>
                        <CardDescription>Import CSV, GeoJSON, or Shapefile data</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
                            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="font-semibold mb-2">Drop files here or click to upload</h3>
                            <p className="text-sm text-muted-foreground mb-4">Supports CSV, GeoJSON, and Shapefile formats</p>
                            <Button>Select Files</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Model Training</CardTitle>
                        <CardDescription>Retrain AI models with latest data</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Last Training</span>
                                <span className="font-medium">2024-01-10</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Model Accuracy</span>
                                <span className="font-medium">87.3%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Training Data</span>
                                <span className="font-medium">125K records</span>
                            </div>
                        </div>
                        <Button className="w-full gap-2">
                            <RefreshCw className="h-4 w-4" />
                            Retrain Model
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
