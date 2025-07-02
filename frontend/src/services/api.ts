import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If the error is due to an expired token (401) and we haven't tried to refresh yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
          // No refresh token available, redirect to login
          window.location.href = '/login'
          return Promise.reject(error)
        }

        // Attempt to refresh the token
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken,
        })

        const { accessToken, refreshToken: newRefreshToken } = response.data

        // Store the new tokens
        localStorage.setItem('token', accessToken)
        localStorage.setItem('refreshToken', newRefreshToken)

        // Update the authorization header
        originalRequest.headers.Authorization = `Bearer ${accessToken}`

        // Retry the original request
        return api(originalRequest)
      } catch (refreshError) {
        // If refresh fails, redirect to login
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api

// Auth API
export const authApi = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  register: (userData: any) => api.post('/auth/register', userData),
  refreshToken: (refreshToken: string) => api.post('/auth/refresh', { refreshToken }),
  getProfile: () => api.get('/auth/profile'),
}

// Users API
export const usersApi = {
  getAll: () => api.get('/users'),
  getById: (id: string) => api.get(`/users/${id}`),
  create: (userData: any) => api.post('/users', userData),
  update: (id: string, userData: any) => api.patch(`/users/${id}`, userData),
  delete: (id: string) => api.delete(`/users/${id}`),
}

// Roles API
export const rolesApi = {
  getAll: () => api.get('/roles'),
  getById: (id: number) => api.get(`/roles/${id}`),
  create: (roleData: any) => api.post('/roles', roleData),
  update: (id: number, roleData: any) => api.patch(`/roles/${id}`, roleData),
  delete: (id: number) => api.delete(`/roles/${id}`),
}