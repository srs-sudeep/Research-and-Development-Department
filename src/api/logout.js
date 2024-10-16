import apiClient from 'core/api/apiConfig'
const API_ENDPOINT = '/auth/logout'

const logoutAPi = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken')
    const response = await apiClient.post(API_ENDPOINT, {
      refreshToken,
    })
    return response.status
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Logout failed')
  }
}
export default logoutAPi
