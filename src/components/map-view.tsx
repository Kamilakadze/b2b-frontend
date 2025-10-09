"use client"

import { useEffect, useRef, useState } from "react"
import { useMapStore } from "@/lib/store"
import { Button } from "@/components/ui/button"

interface CoworkingLocation {
    id: string
    name: string
    lat: number
    lng: number
    address: string
    capacity: number
    occupancy: number
}

interface HeatmapPoint {
    lat: number
    lng: number
    intensity: number
}

// Mock data for coworking spaces in Almaty
const mockCoworkings: CoworkingLocation[] = [
    {
        id: "1",
        name: "Astana Hub Almaty",
        lat: 43.238949,
        lng: 76.889709,
        address: "Al-Farabi Ave 77/8",
        capacity: 150,
        occupancy: 85,
    },
    {
        id: "2",
        name: "Nomad Coworking",
        lat: 43.2567,
        lng: 76.9286,
        address: "Dostyk Ave 162",
        capacity: 80,
        occupancy: 65,
    },
    {
        id: "3",
        name: "WorkSpace Almaty",
        lat: 43.2425,
        lng: 76.9144,
        address: "Abay Ave 143",
        capacity: 120,
        occupancy: 92,
    },
    {
        id: "4",
        name: "Creative Hub",
        lat: 43.2201,
        lng: 76.8512,
        address: "Satpaev St 90",
        capacity: 60,
        occupancy: 48,
    },
]

// Mock heatmap data
const mockHeatmapData: HeatmapPoint[] = [
    { lat: 43.238949, lng: 76.889709, intensity: 0.9 },
    { lat: 43.2567, lng: 76.9286, intensity: 0.7 },
    { lat: 43.2425, lng: 76.9144, intensity: 0.85 },
    { lat: 43.2201, lng: 76.8512, intensity: 0.6 },
    { lat: 43.2345, lng: 76.9012, intensity: 0.75 },
    { lat: 43.2489, lng: 76.8756, intensity: 0.65 },
]

// Convert lat/lng to pixel coordinates
function latLngToPixel(
    lat: number,
    lng: number,
    zoom: number,
    centerLat: number,
    centerLng: number,
    width: number,
    height: number,
) {
    const scale = 256 * Math.pow(2, zoom)
    const worldX = (lng + 180) * (scale / 360)
    const worldY = scale / 2 - (scale * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))) / (2 * Math.PI)

    const centerWorldX = (centerLng + 180) * (scale / 360)
    const centerWorldY =
        scale / 2 - (scale * Math.log(Math.tan(Math.PI / 4 + (centerLat * Math.PI) / 360))) / (2 * Math.PI)

    return {
        x: worldX - centerWorldX + width / 2,
        y: worldY - centerWorldY + height / 2,
    }
}

function getTileUrl(x: number, y: number, zoom: number): string {
    return `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`
}

function latLngToTile(lat: number, lng: number, zoom: number) {
    const x = Math.floor(((lng + 180) / 360) * Math.pow(2, zoom))
    const y = Math.floor(
        ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) *
        Math.pow(2, zoom),
    )
    return { x, y }
}

export function MapView() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const { center, zoom, setZoom } = useMapStore()
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
    const [tiles, setTiles] = useState<Array<{ x: number; y: number; url: string; offsetX: number; offsetY: number }>>([])

    // Update dimensions on resize
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight,
                })
            }
        }

        updateDimensions()
        window.addEventListener("resize", updateDimensions)
        return () => window.removeEventListener("resize", updateDimensions)
    }, [])

    useEffect(() => {
        const centerTile = latLngToTile(center[0], center[1], zoom)
        const tilesNeeded: Array<{ x: number; y: number; url: string; offsetX: number; offsetY: number }> = []

        // Calculate how many tiles we need to cover the viewport
        const tilesX = Math.ceil(dimensions.width / 256) + 2
        const tilesY = Math.ceil(dimensions.height / 256) + 2

        const startX = centerTile.x - Math.floor(tilesX / 2)
        const startY = centerTile.y - Math.floor(tilesY / 2)

        for (let i = 0; i < tilesX; i++) {
            for (let j = 0; j < tilesY; j++) {
                const tileX = startX + i
                const tileY = startY + j
                const maxTile = Math.pow(2, zoom)

                // Wrap tiles horizontally, skip invalid vertical tiles
                if (tileY >= 0 && tileY < maxTile) {
                    const wrappedX = ((tileX % maxTile) + maxTile) % maxTile
                    tilesNeeded.push({
                        x: wrappedX,
                        y: tileY,
                        url: getTileUrl(wrappedX, tileY, zoom),
                        offsetX: (tileX - centerTile.x) * 256,
                        offsetY: (tileY - centerTile.y) * 256,
                    })
                }
            }
        }

        setTiles(tilesNeeded)
    }, [center, zoom, dimensions])

    // Draw heatmap on canvas
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Clear canvas
        ctx.clearRect(0, 0, dimensions.width, dimensions.height)

        // Draw heatmap points
        mockHeatmapData.forEach((point) => {
            const pos = latLngToPixel(point.lat, point.lng, zoom, center[0], center[1], dimensions.width, dimensions.height)

            // Create radial gradient for each point
            const radius = 80 * point.intensity
            const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, radius)

            // Color gradient based on intensity (blue -> cyan -> yellow)
            if (point.intensity < 0.5) {
                const t = point.intensity * 2
                gradient.addColorStop(0, `rgba(37, 99, 235, ${0.6 * point.intensity})`) // blue
                gradient.addColorStop(0.5, `rgba(34, 211, 238, ${0.4 * point.intensity})`) // cyan
                gradient.addColorStop(1, "rgba(37, 99, 235, 0)")
            } else {
                const t = (point.intensity - 0.5) * 2
                gradient.addColorStop(0, `rgba(250, 204, 21, ${0.7 * point.intensity})`) // yellow
                gradient.addColorStop(0.5, `rgba(34, 211, 238, ${0.5 * point.intensity})`) // cyan
                gradient.addColorStop(1, "rgba(34, 211, 238, 0)")
            }

            ctx.fillStyle = gradient
            ctx.fillRect(pos.x - radius, pos.y - radius, radius * 2, radius * 2)
        })
    }, [center, zoom, dimensions])

    const handleZoomIn = () => {
        setZoom(Math.min(zoom + 1, 18))
    }

    const handleZoomOut = () => {
        setZoom(Math.max(zoom - 1, 3))
    }

    return (
        <div ref={containerRef} className="relative h-full w-full bg-muted overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                {tiles.map((tile, idx) => (
                    <img
                        key={`${tile.x}-${tile.y}-${zoom}`}
                        src={tile.url || "/placeholder.svg"}
                        alt=""
                        className="absolute"
                        style={{
                            width: "256px",
                            height: "256px",
                            left: `calc(50% + ${tile.offsetX}px)`,
                            top: `calc(50% + ${tile.offsetY}px)`,
                            transform: "translate(-50%, -50%)",
                        }}
                        crossOrigin="anonymous"
                    />
                ))}
            </div>

            {/* Heatmap canvas */}
            <canvas
                ref={canvasRef}
                width={dimensions.width}
                height={dimensions.height}
                className="absolute inset-0 pointer-events-none"
                style={{ mixBlendMode: "multiply" }}
            />

            {/* Map info */}
            <div className="absolute top-4 left-4 bg-card/95 backdrop-blur border border-border rounded-lg px-4 py-2 shadow-lg">
                <div className="text-sm font-medium">Almaty, Kazakhstan</div>
                <div className="text-xs text-muted-foreground">Zoom: {zoom}</div>
            </div>

            <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                <Button size="icon" variant="secondary" onClick={handleZoomIn} className="shadow-lg">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                </Button>
                <Button size="icon" variant="secondary" onClick={handleZoomOut} className="shadow-lg">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                </Button>
                <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => {
                        setZoom(12)
                    }}
                    className="shadow-lg"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                    </svg>
                </Button>
            </div>
        </div>
    )
}
