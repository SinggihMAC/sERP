import { create } from 'zustand'
import { authApi } from '../services/api'

interface User {
  id: string
  name: string
  email: string
  roleId: number
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  getProfile: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authApi.login(email, password)
      const { accessToken, refreshToken, user } = response.data

      // Store tokens in localStorage
      localStorage.setItem('token', accessToken)
      localStorage.setItem('refreshToken', refreshToken)

      set({ user, isAuthenticated: true, isLoading: false })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Login failed',
        isLoading: false,
        isAuthenticated: false,
      })
    }
  },

  logout: () => {
    // Clear tokens from localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')

    set({ user: null, isAuthenticated: false })
  },

  getProfile: async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      set({ isAuthenticated: false, user: null })
      return
    }

    set({ isLoading: true, error: null })
    try {
      const response = await authApi.getProfile()
      set({ user: response.data, isAuthenticated: true, isLoading: false })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to get profile',
        isLoading: false,
        isAuthenticated: false,
        user: null,
      })
    }
  },
}))