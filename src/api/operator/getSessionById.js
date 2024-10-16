import apiClient from 'core/api/apiConfig'

const getSessionById = async (sessionId) => {
  try {
    const response = await apiClient.get(`/sessions/indi/${sessionId}`)
    console.log('response', response.data)
    return response.data
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Error getting sessions'
    throw new Error(errorMessage)
  }
}

export default getSessionById
