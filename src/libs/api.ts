import { BASE_URL } from '@env'
import axios from 'axios'
import { AsyncStorage } from 'react-native'
const api = axios.create({
  baseURL: BASE_URL,
})

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('jwt')
  if (token) config.headers = { Authorization: `Bearer ${token}` }

  return config
})

export default api
