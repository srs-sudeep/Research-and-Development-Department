import apiClient from 'core/api/apiConfig'

const getIndiHospital = async () => {
  try {
    const response = await apiClient.get('/hospitals/indi')
    console.log('response', response.data)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Error fetching hospital beds',
    )
  }
}

export default getIndiHospital
