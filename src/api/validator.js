import apiClient from 'core/api/apiConfig'

const API_ENDPOINT = '/auth/verify-role'

const validator = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINT)
    const user = response.data.user
    return { user }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed')
  }
}

export default validator
