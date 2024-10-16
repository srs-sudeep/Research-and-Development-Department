import apiClient from 'core/api/apiConfig'

const API_ENDPOINT = '/auth/login'

export const loginApi = async (phone, password) => {
  try {
    // Send the phone and password to the backend for authentication
    const response = await apiClient.post(API_ENDPOINT, {
      phone,
      password,
    })
    const { user, tokens } = response.data
    localStorage.setItem('refreshToken', tokens.refresh.token)
    localStorage.setItem('accessToken', tokens.access.token)
    console.log(user)
    localStorage.setItem('userId', user.id)
    return { user, tokens }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed')
  }
}
