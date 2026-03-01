import { create } from "zustand"
import { api } from "./api"

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
    register: (email: string, password: string, fullName?: string) => Promise<void>
    logout: () => void
    setUser: (user: User, token: string) => void
    fetchMe: () => Promise<boolean>
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

function mapBackendUser(backendUser: { id: number; email: string; full_name: string | null; is_admin: boolean }): User {
    return {
        id: String(backendUser.id),
        email: backendUser.email,
        name: backendUser.full_name || backendUser.email,
        role: backendUser.is_admin ? "admin" : "user",
    }
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    login: async (email: string, password: string) => {
        const { data } = await api.post<{ access_token: string; user: { id: number; email: string; full_name: string | null; is_admin: boolean } }>("/auth/login", { email, password })
        const user = mapBackendUser(data.user)
        const token = data.access_token
        set({ user, token, isAuthenticated: true })
        localStorage.setItem("token", token)
    },
    fetchMe: async () => {
        const token = localStorage.getItem("token")
        if (!token) return false
        try {
            const { data } = await api.get<{ id: number; email: string; full_name: string | null; is_admin: boolean }>("/auth/me")
            set({ user: mapBackendUser(data), token, isAuthenticated: true })
            return true
        } catch {
            localStorage.removeItem("token")
            set({ user: null, token: null, isAuthenticated: false })
            return false
        }
    },
    register: async (email: string, password: string, fullName?: string) => {
        await api.post("/auth/register", { email, password, full_name: fullName || null })
        const { data } = await api.post<{ access_token: string; user: { id: number; email: string; full_name: string | null; is_admin: boolean } }>("/auth/login", {
            email,
            password,
        })
        const user = mapBackendUser(data.user)
        const token = data.access_token
        set({ user, token, isAuthenticated: true })
        localStorage.setItem("token", token)
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
