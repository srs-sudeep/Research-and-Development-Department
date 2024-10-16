import apiClient from 'core/api/apiConfig'

const updateIndiHospital = async (beds) => {
  try {
    const response = await apiClient.patch('/hospitals/indi', { beds })
    return response.data
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Error updating bed details'
    console.error('API Error:', errorMessage)
    throw new Error(errorMessage)
  }
}

export default updateIndiHospital
