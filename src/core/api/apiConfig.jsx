import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_APP_SERVER_URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

// Add a request interceptor to include the access token
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default apiClient
