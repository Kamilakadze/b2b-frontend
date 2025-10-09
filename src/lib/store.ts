import { create } from "zustand"

interface User {
    id: string
    email: string
    name: string
    role: "admin" | "user"
}

interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    setUser: (user: User, token: string) => void
}

interface MapState {
    center: [number, number]
    zoom: number
    selectedDistrict: string | null
    radius: number
    timeOfDay: string
    setCenter: (center: [number, number]) => void
    setZoom: (zoom: number) => void
    setSelectedDistrict: (district: string | null) => void
    setRadius: (radius: number) => void
    setTimeOfDay: (time: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    login: async (email: string, password: string) => {
        // TODO: Replace with actual API call
        // Simulated login for now
        const mockUser: User = {
            id: "1",
            email,
            name: "Demo User",
            role: "user",
        }
        const mockToken = "mock-jwt-token"

        set({ user: mockUser, token: mockToken, isAuthenticated: true })
        localStorage.setItem("token", mockToken)
    },
    logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
        localStorage.removeItem("token")
    },
    setUser: (user: User, token: string) => {
        set({ user, token, isAuthenticated: true })
    },
}))

export const useMapStore = create<MapState>((set) => ({
    center: [43.222, 76.8512], // Central Almaty coordinates
    zoom: 12,
    selectedDistrict: null,
    radius: 1000,
    timeOfDay: "all",
    setCenter: (center) => set({ center }),
    setZoom: (zoom) => set({ zoom }),
    setSelectedDistrict: (district) => set({ selectedDistrict: district }),
    setRadius: (radius) => set({ radius }),
    setTimeOfDay: (time) => set({ timeOfDay: time }),
}))
