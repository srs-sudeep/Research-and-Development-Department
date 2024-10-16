import apiClient from 'core/api/apiConfig'

// Add a request interceptor to handle token refresh
apiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor to handle token expiry
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = localStorage.getItem('refreshToken')
      console.log('refreshToken', refreshToken)
      const response = await apiClient.post('/auth/refresh-tokens', {
        refreshToken,
      })

      const { accessToken } = response.data
      localStorage.setItem('accessToken', accessToken)
      apiClient.defaults.headers.common['Authorization'] =
        `Bearer ${accessToken}`

      return apiClient(originalRequest)
    }
    return Promise.reject(error)
  },
)
