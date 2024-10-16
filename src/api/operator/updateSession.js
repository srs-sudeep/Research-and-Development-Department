import apiClient from 'core/api/apiConfig'

const updateSession = async (sessionId, updateData) => {
  try {
    const response = await apiClient.patch(`/sessions/${sessionId}`, {
      updateData,
    })
    return response.data
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Error updating bed details'
    console.error('API Error:', errorMessage)
    throw new Error(errorMessage)
  }
}

export default updateSession
