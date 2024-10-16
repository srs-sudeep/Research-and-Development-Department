import apiClient from 'core/api/apiConfig'

const getSessions = async (operatorId) => {
  try {
    const response = await apiClient.get(`/sessions/${operatorId}`)
    return response.data
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Error getting sessions'
    throw new Error(errorMessage)
  }
}

export default getSessions
