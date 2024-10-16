import apiClient from 'core/api/apiConfig'

const updateIndiHospital = async (beds) => {
  console.log(beds)
  try {
    const response = await apiClient.patch('/hospitals/indi', { beds })
    return response.data
  } catch (error) {
    // Improved error handling
    const errorMessage =
      error.response?.data?.message || 'Error updating bed details'
    console.error('API Error:', errorMessage) // Log the error for debugging
    throw new Error(errorMessage) // Throw a new error with a descriptive message
  }
}

export default updateIndiHospital
