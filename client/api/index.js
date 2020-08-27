import axios from 'axios'

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'http://wiseness.ru/api' : 'http://localhost:3000/api',
})

export const insertSource = payload => api.post(`/source`, payload)
export const getAllSources = () => api.get(`/sources`)
export const updateSourceById = (id, payload) => api.put(`/source/${id}`, payload)
export const deleteSourceById = id => api.delete(`/source/${id}`)
export const getSourceById = id => api.get(`/source/${id}`)

const apis = {
    insertSource,
    getAllSources,
    updateSourceById,
    deleteSourceById,
    getSourceById,
}

export default apis