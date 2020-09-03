import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.API_URI || '//wiseness.ru/api' : 'http://localhost:3000/api',
})

const userApi = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.API_URI || '//wiseness.ru/users' : 'http://localhost:3000/users',
})

export const insertSource = payload => api.post(`/source`, payload)
export const getAllSources = () => api.get(`/sources`)
export const updateSourceById = (id, payload) => api.put(`/source/${id}`, payload)
export const deleteSourceById = id => api.delete(`/source/${id}`)
export const getSourcesByUser = user => api.get(`/sources/${user}`)
export const signIn = payload => userApi.post(`/signin`, payload)
export const signUp = payload => userApi.post(`/signup`, payload)
export const getUser = token => userApi.get(`/getUser`, { headers: { 'Content-Type': 'application/json', 'token': token } })

const apis = {
  insertSource,
  getAllSources,
  updateSourceById,
  deleteSourceById,
  getSourcesByUser,
  signIn,
  signUp,
  getUser,
}

export default apis